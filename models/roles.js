'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.hasMany(models.users,{
        foreignKey: 'role_id',
        as: 'users'
      })
    }
  }
  roles.init({
    role_id: DataTypes.INTEGER,
    role_name: DataTypes.STRING(50),
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};