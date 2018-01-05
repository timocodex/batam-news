export default `
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
  addComment(userId:String!,content:String!,newsId:String!): Comment
}
`;