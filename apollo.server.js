const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginInlineTrace,
} = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { PubSub } = require("graphql-subscriptions");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const FormatError = require("easygraphql-format-error");

const { resolvers, typeDefs } = require("./src/graphql");
const { User } = require("./src/models");
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

  const schema = makeExecutableSchema({ typeDefs, resolvers });

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
        let userData;
        if (tokenData) {
          userData = await User.findById(tokenData._id);
        }
        return {
          pubsub,
          user: userData,
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers["authorization"];
      let userData;
      if (token) {
        const tokenData = await jwtVerfy(token);
        if (tokenData) {
          userData = await User.findById(tokenData._id);
        }
      }
      return {
        user: userData,
        token,
        pubsub,
      };
    },
    formatError: (err) => {
      console.error(err.extensions);
      return formatError.getError(err);
    },
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
  });

  await server.start();

  // ✅ لازم تحدد المسار هنا بشكل واضح
  server.applyMiddleware({ app, path: "/graphql" });

  console.log(
    `🚀 Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};
