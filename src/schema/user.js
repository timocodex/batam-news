export default `
    type User {
      id:ID!
      username:String!
      email:String!
      firstName:String
      lastName:String
      isAuthor:Boolean
      news:[News]
    }
    type Query {
      users: [User]
    }
    type Mutation {
      addUser(username:String!,password:String!,email:String!,firstName:String!,lastName:String!,isAuthor:Boolean!): User
    }
    `;
 