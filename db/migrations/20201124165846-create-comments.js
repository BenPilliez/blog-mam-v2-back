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
        references: {
          model: 'comments',
          key: 'id',
          as :'commentsId'
        }
      },
      postsId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'posts',
          key:'id',
          as:'postsId'
        }
      },
      author: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
