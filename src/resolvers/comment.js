import gen from '../helpers/idGenerator'

export default {
  Query: {
    comments: (root,args,{models})=>{
      return models.Comment.findAll({where:{NewsId:args.news}})
    }
  },
  Comment: {
    replies: (comment) =>{
      return comment.getReplies()
    },
    user:(comment)=>{
        return comment.getUser()
    }
  },
  Mutation: {
    addComment: async (root,args,{models})=>{
      let newComment
      if(args.isLogin === false){
        let useranon = await models.User.findOne({where:{username:"anonymous"}})
        newComment = await models.Comment.create({id:gen(),UserId:useranon.id,content:args.content,NewsId:args.newsId}) 
      }else{
        newComment = await models.Comment.create({id:gen(),UserId:args.userId,content:args.content,NewsId:args.newsId})
      }
      return newComment
    }
  },
};