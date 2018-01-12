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
  addComment(isLogin:Boolean!,userId:String,content:String!,newsId:String!): Comment
}
`;