'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _formatErrors = require('../helpers/formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _auth = require('../helpers/auth');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

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
    addUser: async (root, args, { models }) => {
      try {
        let checkAdmin = await models.User.findById(args.userId);
        if (checkAdmin && checkAdmin.isAdmin == true) {
          const user = await models.User.create({
            id: (0, _idGenerator2.default)(),
            password: args.password,
            username: args.username,
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            isAdmin: args.isAdmin
          });
          return {
            ok: true,
            user
          };
        } else {
          return {
            ok: false,
            errors: [{ path: 'user', message: 'unauthorized' }]
          };
        }
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(e, models)
        };
      }
    },
    editProfile: async (root, args, { models }) => {
      try {
        let user = await models.User.findById(args.userId);
        let edit = await user.updateAttributes(args);
        return {
          ok: true,
          user
        };
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(e, models)
        };
      }
    },
    changePassword: async (root, args, { models }) => {
      try {
        let user = await models.User.findById(args.userId);
        const valid = await _bcrypt2.default.compare(args.oldPassword, user.password);
        if (!valid) {
          // bad password
          return {
            ok: false,
            errors: [{ path: 'password', message: 'Wrong password' }]
          };
        } else {
          user.updateAttributes({ password: args.newPassword });
          return {
            ok: true
          };
        }
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