"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
type Reply {
  id: ID! 
  content:String
  user: User
}
type Query {
  replies(comment:String!): [Reply]
}
type Mutation {
  addReply(isLogin:Boolean!,userId:String,commentId:String!,content:String!): Reply
}
`;