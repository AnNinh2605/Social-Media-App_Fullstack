'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId' })
      Post.hasMany(models.Relationship, { foreignKey: 'followerUserId' })
      Post.hasMany(models.Comment, { foreignKey: 'postId' })
      Post.hasMany(models.Like, { foreignKey: 'postId' })
    }
  }
  Post.init({
    desc: DataTypes.STRING,
    img: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};