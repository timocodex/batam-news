export default (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
          type:DataTypes.STRING,
          unique:true
      }
    });
  
    Category.associate = function(models) {
      Category.hasMany(models.News)
    };
  
    return Category;
  };