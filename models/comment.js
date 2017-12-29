export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
      },
      content:DataTypes.TEXT,
    });
  
    Comment.associate = function(models) {
      Comment.belongsTo(models.User,{
          foreignKey:'UserId'
      })
      Comment.belongsTo(models.News,{
          foreignKey:'NewsId'
      })
      Comment.hasMany(models.Reply)
    };
  
    return Comment;
  };