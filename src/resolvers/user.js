import gen from '../helpers/idGenerator'
import formatErrors from '../helpers/formatErrors';
import { tryLogin,createTokens } from '../helpers/auth';

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
    addUser: async (root,args,{models,SECRET,SECRET2}) =>{
      try{
        const user = await models.User.create({
          id:gen(),
          password:args.password,
          username:args.username,
          email:args.email,
          firstName:args.firstName,
          lastName:args.lastName,
          isAuthor:args.isAuthor
        })
        const refreshTokenSecret = user.password + SECRET2;
        const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);
        return {
          ok:true,
          user,
          token,
          refreshToken
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