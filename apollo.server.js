const { ApolloServer, ApolloError } = require("apollo-server-express");
const { resolvers, typeDefs, permissionsComplex } = require("./src/graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { applyMiddleware } = require("graphql-middleware");
const FormatError = require("easygraphql-format-error");
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginInlineTrace } = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { User, Language } = require("./src/models");
const { jwtVerfy } = require("./src/utilities/helpers/encryption");

const pubsub = new PubSub();

module.exports = async (app, httpServer) => {
  const formatError = new FormatError([
    {
      name: "INVALID_EMAIL",
      message: "The email is not valid",
      statusCode: 400,
    },
  ]);

  const schema = false
    ? applyMiddleware(
        makeExecutableSchema({ typeDefs, resolvers }),
        permissionsComplex
      )
    : applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

  // إنشاء خادم WebSocket
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer(
    {
      schema,
      context: async ({ connectionParams }) => {
        const token = connectionParams["Authorization"];
        const tokenData = await jwtVerfy(token);
        var userData;
        if (tokenData) {
          userData = await User.findById(tokenData._id);
        }
        return {
          pubsub: pubsub,
          user: userData,
        };
      },
    },
    wsServer
  );
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginInlineTrace(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    
    context: async ({ req, res }) => {
      const languageCode = req.headers["content-language"];
      var language = await Language.findOne({code: languageCode?.toString().toLocaleLowerCase()});
      if(!language){
        language =  await Language.findOne({code: 'ar'});
      }
      const token = req.headers["authorization"];
      var userData;
      if (token) {
        const tokenData = await jwtVerfy(token);
        if (tokenData) {
          userData = await User.findById(tokenData._id);
        }
      }
      return {
        user: userData,
        token,
        pubsub: pubsub,
        language,
      };
    },
    formatError: (err) => {
      console.error(err.extensions);
      return formatError.getError(err);
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  console.log(
    `Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};
