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
      newsByCategory(categoryId:String!):[News]  
    }
    type Mutation {
      addNews(userId:String!,categoryId:String!,title: String!,content:String!,featured:Boolean!,picturePath:String): News
      updateClickCount(newsId:String!):News
    }
    `;