'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdCollection = sequelize.define('AdCollection', {
    newspaperName: DataTypes.STRING,
    adCategory: DataTypes.STRING,
    adEdition: DataTypes.STRING,
    adType: DataTypes.STRING,
    adTextPrice: DataTypes.STRING,
    adTextWord: DataTypes.STRING,
    adDisplayPrice: DataTypes.STRING,
    adDisplaySize: DataTypes.STRING
  }, {});
  AdCollection.associate = function(models) {
    // associations can be defined here
  };
  return AdCollection;
};