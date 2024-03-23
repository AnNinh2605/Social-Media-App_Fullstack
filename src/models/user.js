'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId' })
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.hasMany(models.Story, { foreignKey: 'userId' })
      User.hasMany(models.Relationship, { foreignKey: 'userId' })
      User.hasMany(models.Like, { foreignKey: 'userId' })

    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    coverPic: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    city: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};