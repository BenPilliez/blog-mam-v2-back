"use strict";
const {Model} = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const moment = require("moment");
require("moment/locale/fr");

module.exports = (sequelize, DataTypes) => {
    class posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            posts.belongsTo(models.category, {
                foreignKey: "categoryId",
                onDelete: "CASCADE"
            });

            posts.belongsTo(models.users, {
                foreignKey: "usersId",
                onDelete: "CASCADE"
            });

            posts.hasMany(models.comments, {
                foreignKey: "postsId"
            });
        }
    }

    posts.init({
        title: {type: DataTypes.STRING, allowNull: false},
        content: {type: DataTypes.TEXT, allowNull: false},
        slug: {type: DataTypes.STRING, unique: true},
        photos: {
            type: DataTypes.TEXT, allowNull: true,
            set(value) {
                return this.setDataValue("photos", value.join(","));
            },
            get() {
                if (this.getDataValue("photos")) {
                    return this.getDataValue("photos").split(",");
                }
            }
        },
        published: {type: DataTypes.BOOLEAN, defaultValue: false},
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            get() {
                return moment(this.getDataValue("createdAt")).format("LL");
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        }
    }, {
        sequelize,
        modelName: "posts",
    });

    SequelizeSlugify.slugifyModel(posts, {
        source: ["title"]
    });

    return posts;
};
