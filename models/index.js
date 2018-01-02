import Sequelize from 'sequelize'
const config = {
  "username": "root",
  "password": "",
  "database": "BatamNews",
  "host": "127.0.0.1",
  "dialect": "mysql" 

  // "username": process.env.MY_USER,
  // "password": process.env.MY_PASS,
  // "database": process.env.MY_DBN,
  // "host": process.env.MY_HOST,
  // "dialect": "mysql",
}
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

module.exports = models;
