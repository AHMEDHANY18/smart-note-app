const lodash = require("lodash");
const adminResolvers = require("./admin.resolvers/index.js");

module.exports = lodash.merge(
    adminResolvers,

);
