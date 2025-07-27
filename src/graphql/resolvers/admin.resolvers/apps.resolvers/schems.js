const { formatters: { Prefixer }, } = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
type PaginationInfo {
  total: Int
  page: Int
  pages: Int
}
type NoteListResponse {
  data: [Note]
  pagination: PaginationInfo
}
    type Query {
      ${Prefixer.addPrefix(
        "GetAll"
      )}(page: Int, limit: Int, search: String):[NoteListResponse],
    }

`;
