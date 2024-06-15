'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.roles, {
        foreignKey: 'role_id',
        as: 'role'
      });

      users.hasOne(models.mahasiswa,{
        foreignKey: 'user_nrp',
        as: 'mahasiswa'
      });
    }
  }
  users.init({
    user_id:DataTypes.INTEGER,
    user_nrp: DataTypes.STRING(50),
    user_name: DataTypes.STRING(50),
    password: DataTypes.STRING(255),
    role_id: DataTypes.INTEGER,
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};