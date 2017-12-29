
export default /* GraphQL */ `
scalar Upload
type File {
  id: ID!
  path: String!
}
type Query {
  uploads: [File]
}
type Mutation {
  singleUpload (file: Upload!): File!
  multipleUpload (files: [Upload!]!): [File!]!
}
`