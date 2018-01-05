import models from '../models'
import gen from '../helper/idGenerator'

const Reply = models.Reply
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
    addReply: async (root,args)=>{
      const newReply = await Reply.create({id:gen(),UserId:args.userId,CommentId:args.commentId,content:args.content})
      return newReply
    },

  },
};