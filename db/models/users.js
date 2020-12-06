'use strict'
const {Model} = require('sequelize')
const bcrypt = require('bcrypt')
const logger = require('../../helpers/logger')
const moment = require('moment')
require('moment/locale/fr')
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            users.hasMany(models.posts, {
                foreignKey: 'usersId'
            })

            users.hasMany(models.rates, {
                foreignKey: 'usersId'
            })

            users.hasMany(models.comments, {
                foreignKey: 'usersId'
            })
        }
    }

    users.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Mail déjà utilisé'
            },
            validate: {
                notEmpty: {
                    msg: 'Allez on rempli le formulaire correctement, il me faut un email'
                },
                notNull: {
                    msg: 'Allez on rempli le formulaire correctement, il me faut un email'
                },
                isEmail: {
                    msg: 'C\'est une adresse mail ça ?'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le mot de passe est requis'
                },
                notNull: {
                    msg: 'Le mot de passe est requis'
                }
            }
        },
        ROLES: {
            type: DataTypes.STRING,
            defaultValue: "ROLE_USER",
            get() {
                return this.getDataValue('ROLES').split(",")
            },
            set(value) {
                const roles = typeof value === "string" ? value : value.join(',')
                return this.setDataValue('ROLES', roles)
            }
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('LL')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                const hash = bcrypt.genSaltSync(12)
                user.password = bcrypt.hashSync(user.password, hash)
            },
            beforeUpdate(user, options) {
                if (user.password && options.fields.includes('password')) {
                    const hash = bcrypt.genSaltSync(12)
                    user.password = bcrypt.hashSync(user.password, hash)
                }
            }
        }, sequelize,
        modelName: 'users',
    });

    users.prototype.validatePassword = function (password) {
        try {
            return bcrypt.compareSync(password, this.password)
        } catch (e) {
            logger.error(e)
        }
    }
    return users
}
