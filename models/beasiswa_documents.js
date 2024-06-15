'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beasiswa_documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  beasiswa_documents.init({
    beasiswa_documents_id: DataTypes.INTEGER,
    user_nrp: DataTypes.STRING(50),
    document_name: DataTypes.STRING,
    document_type: DataTypes.STRING,
    document_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'beasiswa_documents',
  });
  return beasiswa_documents;
};