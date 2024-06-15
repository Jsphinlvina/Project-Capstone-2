'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mahasiswas', {
      mahasiwa_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_nrp: {
        type: Sequelize.STRING(50)
      },
      // mahasiswa_name: {
      //   type: Sequelize.STRING(50)
      // },
      fakultas_id: {
        type: Sequelize.INTEGER
      },
      program_studi_id: {
        type: Sequelize.INTEGER
      },
      ipk: {
        type: Sequelize.FLOAT
      },
      angkatan: {
        type: Sequelize.STRING(4)
      },
      no_tlp: {
        type: Sequelize.STRING(20)
      },
      alamat: {
        type: Sequelize.STRING(50)
      },
      flag: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mahasiswas');
  }
};