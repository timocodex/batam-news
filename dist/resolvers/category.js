'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    categories: (root, args, { models }) => {
      return models.Category.findAll();
    }
  },
  Category: {
    news: category => {
      return category.getNews();
    }
  },
  Mutation: {
    addCategory: async (root, args, { models }) => {
      const newCategory = await models.Category.create({ id: (0, _idGenerator2.default)(), name: args.name });
      return newCategory;
    }
  }
};