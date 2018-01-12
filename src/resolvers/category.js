import gen from '../helpers/idGenerator'

export default {
  Query: {
    categories: (root,args,{models})=>{
      return models.Category.findAll()
    }
  },
  Category:{
    news: (category)=>{
        return category.getNews()
    }
  },
  Mutation: {
    addCategory: async (root,args,{models})=>{
      const newCategory = await models.Category.create({id:gen(),name:args.name})
      return newCategory
    }
  },
};