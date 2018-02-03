export default `
type Comment {
  id: ID! 
  content:String
  user: User
  replies:[Reply]
  createdAt:String
}
type Query {
  comments(news:String!): [Comment]
}
type Mutation {
  addComment(isLogin:Boolean!,userId:String,content:String!,newsId:String!): Comment
}
`;