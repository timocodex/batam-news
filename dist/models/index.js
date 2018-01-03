'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = process.env.NODE_ENV || 'development';
console.log(env);
console.log(__dirname);
const config = require(__dirname + '/../config/config.js')[env];
console.log(config);
const sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
const models = {
  User: sequelize.import('./user'),
  News: sequelize.import('./news'),
  Category: sequelize.import('./category'),
  Comment: sequelize.import('./comment'),
  File: sequelize.import('./file'),
  Reply: sequelize.import('./reply')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = _sequelize2.default;

module.exports = models;