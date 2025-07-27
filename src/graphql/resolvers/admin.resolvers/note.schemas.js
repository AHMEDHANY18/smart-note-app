const { gql } = require("apollo-server-express");

const noteSchema = require("./note.resolvers/schems.js");

module.exports = gql`
  ${noteSchema}
`;

