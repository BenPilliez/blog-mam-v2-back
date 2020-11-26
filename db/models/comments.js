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
      comments.belongsTo(models.users, {
        foreignKey: 'usersId',
        onDelete: "CASCADE",

      })
      comments.hasMany(models.comments, {as:'Children', foreignKey:'commentsId', onDelete:'CASCADE'})
      comments.belongsTo(models.posts, {
        foreignKey: 'postsId',
        onDelete: "CASCADE"
      })
    }
  }
  comments.init({
    content: {type: DataTypes.TEXT, allowNull:false, validate: {notNull: {msg: "Un commentaire vide ? "}, notEmpty: {msg: "Un commentaire vide ?"}}},
    published: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.now
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.now
    }
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};
