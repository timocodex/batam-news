import models from '../models'
import gen from '../helper/idGenerator'

const User = models.User
export default {
  Query: {
    users: ()=>{
      return User.findAll()
    },
  },
  User:{
    news:(user) =>{
      return user.getNews()
    }
  },
  Mutation: {
    addUser: async (root,args) =>{
      const newUser = await User.create({
        id:gen(),
        password:args.password,
        username:args.username,
        email:args.email,
        firstName:args.firstName,
        lastName:args.lastName,
        isAuthor:args.isAuthor
      })
      return newUser
    }
  },
};