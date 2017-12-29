export default (sequelize, DataTypes) => {
    const Reply = sequelize.define('Reply', {
      id: {
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
      },
      content:DataTypes.TEXT,
    });
  
    Reply.associate = function(models) {
      Reply.belongsTo(models.User,{
          foreignKey:'UserId'
      })
      Reply.belongsTo(models.Comment,{
          foreignKey:'CommentId'
      })
    };
  
    return Reply;
  };