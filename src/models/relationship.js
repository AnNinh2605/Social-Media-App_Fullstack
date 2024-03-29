'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Relationship.belongsTo(models.Post, { foreignKey: 'followerUserId' })
    }
  }
  Relationship.init({
    followerUserId: DataTypes.INTEGER,
    followedUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Relationship',
  });
  return Relationship;
};