import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
  const typeDefs = `
    type News {
      id: ID!          
      title: String
      content:String
      author: User
      isFeatured:Boolean
      clickCount: Int
      category: Category
    }
    type User {
      id:ID!
      username:String!
      email:String!
      firstName:String
      lastName:String
      isAuthor:Boolean
      news:[News]
    }
    type Category{
      id:ID!
      name:String!
    }

    type Query {
      news: [News]   
      users: [User]
      categories :[Category]
    }

    type Mutation {
      addNews(user:Int!,category:Int!,title: String!,content:String!,featured:Boolean!): News
      addUser(username:String!,email:String!,firstName:String!,lastName:String!,isAuthor:Boolean!): User
      addCategory(name:String!): Category
    }
    `;
  import { resolvers } from './resolvers';
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  export { schema };