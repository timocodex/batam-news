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
    type RegisterResponse {
      ok: Boolean!
      user: User
      token: String
      refreshToken: String
      errors: [Error!]
    }
    type LoginResponse {
      ok: Boolean!
      token: String
      refreshToken: String
      errors: [Error!]
    }
    type Query {
      users: [User]
    }
    type Mutation {
      addUser(username:String!,password:String!,email:String!,firstName:String!,lastName:String!,isAuthor:Boolean!): RegisterResponse
      login(email:String!,password:String!):LoginResponse
    }
    `;
 