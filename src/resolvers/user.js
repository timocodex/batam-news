import gen from '../helpers/idGenerator'
import formatErrors from '../helpers/formatErrors';
import { tryLogin,createTokens } from '../helpers/auth';
import bcrypt from 'bcrypt';

export default {
  Query: {
    users: (root,args,{models})=>{
      return models.User.findAll()
    },
  },
  User:{
    news:(user) =>{
      return user.getNews()
    }
  },
  Mutation: {
    addUser: async (root,args,{models}) =>{
      try{
        let checkAdmin = await models.User.findById(args.userId)
        if(checkAdmin && checkAdmin.isAdmin == true){
          const user = await models.User.create({
            id:gen(),
            password:args.password,
            username:args.username,
            email:args.email,
            firstName:args.firstName,
            lastName:args.lastName,
            isAdmin:args.isAdmin
          })
          return {
            ok:true,
            user
          }
        }else{
          return {
            ok: false,
            errors:[{ path: 'user', message: 'unauthorized' }]
          }; 
        }
      }catch(e){
        return {
          ok: false,
          errors: formatErrors(e,models)
        };
      }
    },
    editProfile: async(root,args,{models})=>{
      try{
        let user = await models.User.findById(args.userId)
        let edit = await user.updateAttributes(args)
        return {
          ok:true,
          user
        }
      }catch(e){
        return {
          ok: false,
          errors: formatErrors(e,models)
        };
      }
    },
    changePassword: async(root,args,{models})=>{
      try{
        let user = await models.User.findById(args.userId)  
        const valid = await bcrypt.compare(args.oldPassword, user.password);
        if (!valid) {
          // bad password
          return {
            ok: false,
            errors: [{ path: 'password', message: 'Wrong password' }],
          };
        }else{
          user.updateAttributes({password:args.newPassword})
          return{
            ok:true
          }
        }
      }catch(e){
        return {
          ok: false,
          errors: formatErrors(e,models)
        };
      }
    },
    login: async(root,{email,password},{models,SECRET,SECRET2}) =>
      tryLogin(email, password, models, SECRET, SECRET2),
  },
};