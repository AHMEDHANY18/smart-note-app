const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet"); // ✅ NEW
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const routes = require("../routes/index");

module.exports = (app, express) => {
  app.use(helmet()); // ✅ secure headers
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use("/", routes);
};
