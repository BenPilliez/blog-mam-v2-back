'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.hasMany(models.comments, {as:'Parent', foreignKey:'id'})
      comments.belongsTo(models.comments, {as: 'Children'})
      comments.belongsTo(models.postId, {
        foreignKey: 'postsId',
        onDelete: "CASCADE"
      })
    }
  }
  comments.init({
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    email: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};
