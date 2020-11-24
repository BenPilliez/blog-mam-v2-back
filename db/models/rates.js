'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rates.belongsTo(models.posts, {
        foreignKey: 'postsId',
        onDelete: "CASCADE"
      })
    }
  }
  rates.init({
    nb_rates: {type: DataTypes.INTEGER,
      set(value) {
        return this.getDataValue('nb_rates') + 1
      }
    },
    rate: DataTypes.FLOAT,
    calculatedRate: {
      type: DataTypes.VIRTUAL,
      get(){
        return this.getDataValue('rate') / this.getDataValue('nb_rates')
      }
    }
  }, {
    sequelize,
    modelName: 'rates',
  });
  return rates
};
