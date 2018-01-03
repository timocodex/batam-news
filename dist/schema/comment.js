"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
type Comment {
  id: ID! 
  content:String
  user: User
  replies:[Reply]
}
type Query {
  comments(news:String!): [Comment]
}
type Mutation {
  addComment(user:String!,content:String!,news:String!): Comment
}
`;