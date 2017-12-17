export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
        type:DataTypes.STRING,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    isAuthor:DataTypes.BOOLEAN
  });

  User.associate = function(models) {
    User.hasMany(models.News)
  };

  return User;
};