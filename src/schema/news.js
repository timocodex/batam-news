    export default `
    type News {
      id: ID!          
      title: String
      content:String
      author: User
      isFeatured:Boolean
      clickCount: Int
      pictureDetail:String
      category: Category
      comment:[Comment]
      pictures:[File]
      createdAt: String
      updatedAt:String
    }
    type Query {
      allNews: [News]
      news(id:String!): News 
      newsByCategory(categoryId:String!):[News]  
    }
    type Mutation {
      addNews(userId:String!,categoryId:String!,title: String!,content:String!,featured:Boolean!,pictureDetail:String,picturePath:String): News
      updateClickCount(newsId:String!):News
      editNews(newsId:String!,CategoryId:String,title: String,content:String,featured:Boolean,pictureDetail:String,picturePath:String):News
    }
    `;