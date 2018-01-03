"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
    type News {
      id: ID!          
      title: String
      content:String
      author: User
      isFeatured:Boolean
      clickCount: Int
      category: Category
      comment:[Comment]
      pictures:[File]
      createdAt: String
    }
    type Query {
      allNews: [News]
      news(id:String!): News 
      newsByCategory(category:String!):[News]  
    }
    type Mutation {
      addNews(user:String!,category:String!,title: String!,content:String!,featured:Boolean!): News
    }
    `;