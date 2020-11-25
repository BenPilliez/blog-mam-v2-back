'use strict';
const {Model} = require('sequelize')
const SequelizeSlugify = require('sequelize-slugify')

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
            defaultValue: sequelize.NOW
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
