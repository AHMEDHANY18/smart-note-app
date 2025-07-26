const { formatters: { Prefixer }, } = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
    input createAppInput {
        name:String!,
        branch:ID!,
        logo:String,
        description:String
    }
    input updateAppInput {
        _id:ID!,
        branch:ID,
        name:String,
        logo:String,
        description:String
    }
    type Query {
      ${Prefixer.addPrefix("GetAll")}(limit:Int,page:Int):[App],
    }

    type Mutation {
        ${Prefixer.addPrefix("Create")}(createData: createAppInput): App,
        ${Prefixer.addPrefix("Update")}(updateData: updateAppInput): App,
        ${Prefixer.addPrefix("Delete")}(_id:ID!): Boolean,
    }
`;
