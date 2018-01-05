'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _idGenerator = require('../helper/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Comment = _models2.default.Comment;
exports.default = {
  Query: {
    comments: (root, args) => {
      return Comment.findAll({ where: { NewsId: args.news } });
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
    addComment: async (root, args) => {
      const newComment = await Comment.create({ id: (0, _idGenerator2.default)(), UserId: args.userId, content: args.content, NewsId: args.newsId });
      return newComment;
    }
  }
};