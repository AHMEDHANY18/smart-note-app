const lodash = require("lodash");
const appResolvers = require("./app.resolvers/index.js");

module.exports = lodash.merge(
    appResolvers,

);
