'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fakultas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fakultas.hasMany(models.mahasiwa,{
        foreignKey: 'fakultas_id',
        as: 'mahasiswa'
      });

      fakultas.hasMany(models.program_studies, {
        foreignKey: 'fakultas_id',
        as: 'program_studi'
      })
    }
  }
  fakultas.init({
    fakultas_id: DataTypes.INTEGER,
    fakultas_name: DataTypes.STRING(50),
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fakultas',
  });
  return fakultas;
};