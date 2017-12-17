  import models from '../models'
  const User = models.User
  const News = models.News
  const Category = models.Category
  export const resolvers = {
    Query: {
      news: () => {
        return News.findAll()
      },
      users: ()=>{
        return User.findAll()
      }
    },
    News: {
      author: (news) =>{
        return news.getUser()
      },
      category: (news) =>{
        return news.getCategory()
      }
    },
    User:{
      news:(user) =>{
        return user.getNews()
      }
    },
    Mutation: {
      addNews: async (root, args) => {
        const newNews = await News.create({
          UserId:args.user,
          CategoryId:args.category,
          title: args.title,
          clickCount:0,
          content:args.content,
          isFeatured:args.featured
        });
        return newNews;

      },
      // addUser: async (root,args) =>{
      //   const newUser = await User.create({
      //     username:args.username,
      //     email:args.email,
      //     firstName:args.firstName,
      //     lastName:args.lastName,
      //     isAuthor:args.isAuthor
      //   })
      //   return newUser
      // },
      // addCategory: async (root,args)=>{
      //   const newCategory = await Category.create({name:args.name})
      //   return newCategory
      // }
    },
  };