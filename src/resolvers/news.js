import models from '../models'
import gen from '../helper/idGenerator'

const News = models.News
export default {
  Query: {
    allNews: () => {
      return News.findAll()
    },
    newsByCategory: (root,args)=>{
      return News.findAll({where:{CategoryId:category}})
    },
    news: (root,args) =>{
        return News.findById(args.id)
    }
  },
  News: {
    author: (news) =>{
      return news.getUser()
    },
    category: (news) =>{
      return news.getCategory()
    },
    comment: (news)=>{
       return news.getComments()
    },
    pictures: (news) =>{
        return news.getFiles()
    }
  },
  Mutation: {
    addNews: async (root, args) => {
      const newNews = await News.create({
        id:gen(),
        UserId:args.user,
        CategoryId:args.category,
        title: args.title,
        clickCount:0,
        content:args.content,
        isFeatured:args.featured
      });
      return newNews;
    }
  },
};