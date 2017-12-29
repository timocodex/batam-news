import models from '../../models'
import gen from '../../helper/idGenerator'

const Category = models.Category
export default {
  Query: {
    categories: ()=>{
      return Category.findAll()
    }
  },
  Category:{
    news: (category)=>{
        return category.getNews()
    }
  },
  Mutation: {
    addCategory: async (root,args)=>{
      const newCategory = await Category.create({id:gen(),name:args.name})
      return newCategory
    }
  },
};