"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require("../helpers/idGenerator");

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    comments: (root, args, { models }) => {
      return models.Comment.findAll({ where: { NewsId: args.news } });
    }
  },
  Comment: {
    replies: comment => {
      return comment.getReplies();
    },
    user: comment => {
      return comment.getUser();
    }
  },
  Mutation: {
    addComment: async (root, args, { models }) => {
      let newComment;
      if (args.isLogin === false) {
        let useranon = await models.User.findOne({ where: { username: "anonymous" } });
        newComment = await models.Comment.create({ id: (0, _idGenerator2.default)(), UserId: useranon.id, content: args.content, NewsId: args.newsId });
      } else {
        newComment = await models.Comment.create({ id: (0, _idGenerator2.default)(), UserId: args.userId, content: args.content, NewsId: args.newsId });
      }
      return newComment;
    }
  }
};