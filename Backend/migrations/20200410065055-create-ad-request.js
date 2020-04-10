'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AdRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      newspaperCategory: {
        type: Sequelize.STRING
      },
      newspaperName: {
        type: Sequelize.STRING
      },
      newspaperEdition: {
        type: Sequelize.STRING
      },
      newspaperLanguage: {
        type: Sequelize.STRING
      },
      adType: {
        type: Sequelize.STRING
      },
      adRate: {
        type: Sequelize.STRING
      },
      adPublishDate: {
        type: Sequelize.DATE
      },
      ad: {
        type: Sequelize.BLOB
      },
      adStatus: {
        type: Sequelize.STRING
      },
      adPublishedBy: {
        type: Sequelize.INTEGER
      },
      adPublishedProof: {
        type: Sequelize.BLOB
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
    return queryInterface.dropTable('AdRequests');
  }
};