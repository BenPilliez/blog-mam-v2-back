'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentsId:{
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'comments',
          key: 'id',
          as :'commentsId'
        }
      },
      usersId:{
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'users',
          key: 'id',
          as :'usersId',
        }
      },
      postsId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete: "CASCADE",
        references:{
          model: 'posts',
          key:'id',
          as:'postsId'
        }
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.now
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.now
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
