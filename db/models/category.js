'use strict';
const {Model} = require('sequelize')
const SequelizeSlugify = require('sequelize-slugify')
const moment = require('moment')
require('moment/locale/fr')

module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            category.hasMany(models.posts, {
                foreignKey: 'categoryId'
            })
        }
    }

    category.init({
        name: {type: DataTypes.STRING, allowNull: false, unique: {args: true, msg: "Une catégorie existe déjà avec ce nom"}},
        slug: {type: DataTypes.STRING, unique: true},
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            get() {
                return moment(this.getDataValue('cretedAt')).format('LL')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        }
    }, {
        sequelize,
        modelName: 'category',
    });

    SequelizeSlugify.slugifyModel(category, {
        source: ['name']
    })

    return category;
};
