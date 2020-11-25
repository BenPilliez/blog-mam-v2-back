'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ROLES: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique:true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true
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
        await queryInterface.dropTable('users');
    }
};
