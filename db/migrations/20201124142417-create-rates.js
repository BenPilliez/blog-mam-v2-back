'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postsId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references:{
          model: 'posts',
          key: 'id',
          as: 'postsId'
        }
      },
      usersId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references:{
          model: 'users',
          key: 'id',
          as : 'usersId'
        }
      },
      rate:{
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('rates');
  }
};
