'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _idGenerator = require('../helper/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Category = _models2.default.Category;
exports.default = {
  Query: {
    categories: () => {
      return Category.findAll();
    }
  },
  Category: {
    news: category => {
      return category.getNews();
    }
  },
  Mutation: {
    addCategory: async (root, args) => {
      const newCategory = await Category.create({ id: (0, _idGenerator2.default)(), name: args.name });
      return newCategory;
    }
  }
};