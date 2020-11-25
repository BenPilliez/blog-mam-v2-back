'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            usersId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id',
                    as: 'usersId'
                }
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: 'categories',
                    key: 'id',
                    as: 'categoryId'
                }
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique:true
            },
            published: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            photos: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('posts');
    }
};
