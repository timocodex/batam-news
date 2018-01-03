'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Category.associate = function (models) {
    Category.hasMany(models.News);
  };

  return Category;
};