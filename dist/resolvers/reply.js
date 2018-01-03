'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _idGenerator = require('../helper/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Reply = _models2.default.Reply;
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
    addReply: async (root, args) => {
      const newReply = await Reply.create({ id: (0, _idGenerator2.default)(), UserId: args.user, CommentId: args.comment, content: args.content });
      return newReply;
    }
  }
};