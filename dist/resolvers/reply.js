"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require("../helpers/idGenerator");

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    replies: (root, args) => {
      return Reply.findAll({ where: { CommentId: args.comment } });
    }
  },
  Reply: {
    user: reply => {
      return reply.getUser();
    }
  },
  Mutation: {
    addReply: async (root, args, { models }) => {
      let newReply;
      if (args.isLogin === false) {
        let useranon = await models.User.findOne({ where: { username: "anonymous" } });
        newReply = await models.Reply.create({ id: (0, _idGenerator2.default)(), UserId: useranon.id, CommentId: args.commentId, content: args.content });
      } else {
        newReply = await Reply.create({ id: (0, _idGenerator2.default)(), UserId: args.userId, CommentId: args.commentId, content: args.content });
      }
      return newReply;
    }

  }
};