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
        references:{
          model: 'posts',
          key: 'id',
          as: 'postsId'
        }
      },
      rate:{
        type: Sequelize.FLOAT
      },
      nb_rates: {
        type: Sequelize.INTEGER
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
