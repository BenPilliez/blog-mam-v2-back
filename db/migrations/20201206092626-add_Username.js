'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'username', {
            allowNull: false,
            type: Sequelize.STRING,
            unique: {
                msg: 'Pseudonyme déjà utilisé'
            },
            validate: {
                notEmpty: {
                    msg: 'Allez on rempli le formulaire correctement, il me faut un pseudo'
                },
                notNull: {
                    msg: 'Allez on rempli le formulaire correctement, il me faut un pseudo'
                }
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'username')
    }
};
