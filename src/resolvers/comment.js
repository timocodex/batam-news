import models from '../../models'
import gen from '../../helper/idGenerator'

const Comment = models.Comment
export default {
  Query: {
    comments: (root,args)=>{
      return Comment.findAll({where:{NewsId:args.news}})
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
    addComment: async (root,args)=>{
      const newComment = await Comment.create({id:gen(),UserId:args.user,content:args.content,NewsId:args.news})
      return newComment
    }
  },
};