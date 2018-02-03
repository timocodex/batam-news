"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
    type User {
      id:ID!
      username:String!
      email:String!
      firstName:String
      lastName:String
      isAdmin:Boolean
      news:[News]
    }
    type RegisterResponse {
      ok: Boolean!
      user: User
      errors: [Error!]
    }
    type ChangePasswordResponse{
      ok:Boolean!
      errors:[Error!]
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
      addUser(userId:String!,username:String!,password:String!,email:String!,firstName:String!,lastName:String!,isAdmin:Boolean!): RegisterResponse
      login(email:String!,password:String!):LoginResponse
      editProfile(userId:String!,username:String,email:String,firstName:String,lastName:String):RegisterResponse
      changePassword(userId:String!,oldPassword:String!,newPassword:String!):ChangePasswordResponse
    }
    `;