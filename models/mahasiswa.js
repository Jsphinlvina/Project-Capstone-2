'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mahasiswa.belongsTo(models.users,{
        foreignKey: 'user_nrp',
        as: 'user'
      });

      mahasiswa.belongsTo(models.fakultas, {
        foreignKey: 'fakultas_id',
        as: 'fakultas'
      });

      mahasiswa.belongsTo(models.program_studies, {
        foreignKey: 'program_studi_id',
        as: 'prgram_studi'
      })
    }
  }
  mahasiswa.init({
    mahasiswa_id: DataTypes.INTEGER,
    user_nrp: DataTypes.STRING(50),
    // mahasiswa_name: DataTypes.STRING(50),
    fakultas_id: DataTypes.INTEGER,
    program_studi_id: DataTypes.INTEGER,
    ipk: DataTypes.FLOAT,
    angkatan: DataTypes.STRING(4),
    no_tlp: DataTypes.STRING(20),
    alamat: DataTypes.STRING(50),
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mahasiswa',
  });
  return mahasiswa;
};