"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
    type Category{
      id:ID!
      name:String!
      news:[News]
    }
    type Query {
      categories :[Category]
    }
    type Mutation {
      addCategory(name:String!): Category
    }
    `;