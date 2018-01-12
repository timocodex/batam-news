import gen from '../helpers/idGenerator'

export default {
  Query: {
    replies: (root,args)=>{
      return Reply.findAll({where:{CommentId:args.comment}})
    }
  },
  Reply: {
    user:(reply)=>{
        return reply.getUser()
    }
  },
  Mutation: {
    addReply: async (root,args,{models})=>{
      let newReply
      if(args.isLogin === false){
        let useranon = await models.User.findOne({where:{username:"anonymous"}})
        newReply = await models.Reply.create({id:gen(),UserId:useranon.id,CommentId:args.commentId,content:args.content}) 
      }else{
        newReply = await Reply.create({id:gen(),UserId:args.userId,CommentId:args.commentId,content:args.content})
      }
      return newReply
    },

  },
};