export default (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
      title: {
          type:DataTypes.STRING,
          unique:true
      },
      content:DataTypes.TEXT,
      isFeatured:DataTypes.BOOLEAN,
      clickCount:DataTypes.INTEGER,
    });
  
    News.associate = function(models) {
      News.belongsTo(models.User,{
          foreignKey:'UserId'
      })
      News.belongsTo(models.Category,{
          foreignKey:'CategoryId'
      })
    };
  
    return News;
  };