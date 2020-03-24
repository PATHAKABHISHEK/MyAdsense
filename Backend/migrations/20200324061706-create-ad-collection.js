'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AdCollections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      newspaperName: {
        type: Sequelize.STRING
      },
      adCategory: {
        type: Sequelize.STRING
      },
      adEdition: {
        type: Sequelize.STRING
      },
      adType: {
        type: Sequelize.STRING
      },
      adTextPrice: {
        type: Sequelize.STRING
      },
      adTextWord: {
        type: Sequelize.STRING
      },
      adDisplayPrice: {
        type: Sequelize.STRING
      },
      adDisplaySize: {
        type: Sequelize.STRING
      },
      newspaperLanguage: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AdCollections');
  }
};