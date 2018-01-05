'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _idGenerator = require('../helper/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const News = _models2.default.News;
exports.default = {
  Query: {
    allNews: () => {
      return News.findAll();
    },
    newsByCategory: (root, args) => {
      return News.findAll({ where: { CategoryId: category } });
    },
    news: (root, args) => {
      return News.findById(args.id);
    }
  },
  News: {
    author: news => {
      return news.getUser();
    },
    category: news => {
      return news.getCategory();
    },
    comment: news => {
      return news.getComments();
    },
    pictures: news => {
      return news.getFiles();
    }
  },
  Mutation: {
    addNews: async (root, args) => {
      const newNews = await News.create({
        id: (0, _idGenerator2.default)(),
        UserId: args.userId,
        CategoryId: args.categoryId,
        title: args.title,
        clickCount: 0,
        content: args.content,
        isFeatured: args.featured
      });
      return newNews;
    },
    updateClickCount: async (root, args) => {
      const thisNews = await News.findById(args.newsId);
      const updateClick = await thisNews.update({ clickCount: thisNews.clickCount + 1 });
      return updateClick;
    }
  }
};