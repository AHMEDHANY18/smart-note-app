const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const routes = require("../routes/index");

module.exports = (app, express) => {
    
    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    // app.use(express.static(path.join(__dirname, 'public')));
    app.use(rateLimit({
        windowMs: 1 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }));
    app.use('/',routes);
};
