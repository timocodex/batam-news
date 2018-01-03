'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _idGenerator = require('../helper/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _models2.default.User;
exports.default = {
  Query: {
    users: () => {
      return User.findAll();
    }
  },
  User: {
    news: user => {
      return user.getNews();
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      const newUser = await User.create({
        id: (0, _idGenerator2.default)(),
        password: args.password,
        username: args.username,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        isAuthor: args.isAuthor
      });
      return newUser;
    }
  }
};