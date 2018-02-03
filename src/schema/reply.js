export default `
type Reply {
  id: ID! 
  content:String
  user: User,
  createdAt:String
}
type Query {
  replies(comment:String!): [Reply]
}
type Mutation {
  addReply(isLogin:Boolean!,userId:String,commentId:String!,content:String!): Reply
}
`;