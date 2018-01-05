export default `
type Reply {
  id: ID! 
  content:String
  user: User
}
type Query {
  replies(comment:String!): [Reply]
}
type Mutation {
  addReply(userId:String!,commentId:String!,content:String!): Reply
}
`;