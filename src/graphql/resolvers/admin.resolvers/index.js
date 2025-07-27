const lodash = require("lodash");

const noteResolvers = require("./note.resolvers/index.js");

module.exports = lodash.merge(noteResolvers);
