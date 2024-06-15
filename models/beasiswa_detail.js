'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beasiswa_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  beasiswa_detail.init({
    beasiswa_detail_id: DataTypes.INTEGER,
    jenis_beasiswa_name: DataTypes.STRING(50),
    user_nrp: DataTypes.STRING(50),
    approval: DataTypes.INTEGER,
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'beasiswa_detail',
  });
  return beasiswa_detail;
};