'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenis_beasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jenis_beasiswa.init({
    jenis_beasiswa_id: DataTypes.INTEGER,
    jenis_beasiswa_name: DataTypes.STRING(50),
    periode: DataTypes.STRING(50),
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jenis_beasiswa',
  });
  return jenis_beasiswa;
};