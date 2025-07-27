const lodash = require("lodash");

const appsResolvers = require("./apps.resolvers/index.js");

module.exports = lodash.merge(
  appsResolvers,

);
