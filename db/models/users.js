'use strict'
const {Model} = require('sequelize')
const bcrypt = require('bcrypt')
const logger = require('../../helpers/logger')

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
                foreignKey: 'postsId'
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
                return this.setDataValue('ROLES', value.join(','))
            }
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
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

    users.prototype.validatePassword = (password) => {
        try {
            return bcrypt.compareSync(password, this.password)
        } catch (e) {
            logger.error(e)
        }
    }
    return users
}
