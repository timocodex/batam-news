'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    isFeatured: DataTypes.BOOLEAN,
    clickCount: DataTypes.INTEGER,
    pictureDetail: DataTypes.STRING
  });

  News.associate = function (models) {
    News.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
    News.belongsTo(models.Category, {
      foreignKey: 'CategoryId'
    });
    News.hasMany(models.Comment);
    News.hasMany(models.File);
  };

  return News;
};