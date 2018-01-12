'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _formatErrors = require('../helpers/formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _auth = require('../helpers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    users: (root, args, { models }) => {
      return models.User.findAll();
    }
  },
  User: {
    news: user => {
      return user.getNews();
    }
  },
  Mutation: {
    addUser: async (root, args, { models, SECRET, SECRET2 }) => {
      try {
        const user = await models.User.create({
          id: (0, _idGenerator2.default)(),
          password: args.password,
          username: args.username,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          isAuthor: args.isAuthor
        });
        const refreshTokenSecret = user.password + SECRET2;
        const [token, refreshToken] = await (0, _auth.createTokens)(user, SECRET, refreshTokenSecret);
        return {
          ok: true,
          user,
          token,
          refreshToken
        };
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(e, models)
        };
      }
    },
    login: async (root, { email, password }, { models, SECRET, SECRET2 }) => (0, _auth.tryLogin)(email, password, models, SECRET, SECRET2)
  }
};