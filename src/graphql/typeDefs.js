const { gql } = require("apollo-server-express");
const appSchemas = require("./resolvers/admin.resolvers/app.schemas.js");

module.exports = gql`
  scalar JSON
  scalar DateTime
  scalar Any

  input Pagination {
    limit: Int
    page: Int
  }

  type User {
    _id: ID
    fullname: String
    phone: String
    role: String
    avatar: String
    blocked: Boolean
    verfied: Boolean
    deleted: Boolean
  }

  type Response {
    success: Boolean
    message: String
    data: JSON
    token: String
  }
  type Category {
    _id: ID!
    title: String!
    color: String
    icon: String
    isDefault: Boolean
    createdAt: String
    updatedAt: String
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    category: Category
    ownerId: User
    createdAt: String
    updatedAt: String
  }

  ${appSchemas}
`;
