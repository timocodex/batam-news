import Sequelize from 'sequelize'
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.js')[env];
export default async () => {
const sequelize = new Sequelize(config.database,config.username,config.password,config);
const models = {
    User: sequelize.import('./user'),
    News: sequelize.import('./news'),
    Category: sequelize.import('./category'),
    Comment : sequelize.import('./comment'),
    File: sequelize.import('./file'),
    Reply: sequelize.import('./reply')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

return models;
}