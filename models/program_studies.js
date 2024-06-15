'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class program_studies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      program_studies.belongsTo(models.fakultas,{
        foreignKey: 'fakultas_id',
        as: 'fakultas'
      });

      program_studies.hasMany(models.mahasiswa,{
        foreignKey: 'program_studi_id',
        as: 'mahasiswa'
      });
    }
  }
  program_studies.init({
    program_studi_id: DataTypes.INTEGER,
    program_studi_name: DataTypes.STRING(50),
    fakultas_id: DataTypes.INTEGER,
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'program_studies',
  });
  return program_studies;
};