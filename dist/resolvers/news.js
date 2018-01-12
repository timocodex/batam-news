'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allNews: (root, args, { models }) => {
      return models.News.findAll();
    },
    newsByCategory: (root, args, { models }) => {
      return models.News.findAll({ where: { CategoryId: args.categoryId } });
    },
    news: (root, args, { models }) => {
      return models.News.findById(args.id);
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
    addNews: async (root, args, { models }) => {
      const newNews = await models.News.create({
        id: (0, _idGenerator2.default)(),
        UserId: args.userId,
        CategoryId: args.categoryId,
        title: args.title,
        clickCount: 0,
        content: args.content,
        isFeatured: args.featured
      });
      const file = await models.File.create({
        id: (0, _idGenerator2.default)(),
        path: args.picturePath,
        NewsId: newNews.id
      });
      return newNews;
    },
    updateClickCount: async (root, args, { models }) => {
      const thisNews = await models.News.findById(args.newsId);
      const updateClick = await thisNews.update({ clickCount: thisNews.clickCount + 1 });
      return updateClick;
    }
  }
};