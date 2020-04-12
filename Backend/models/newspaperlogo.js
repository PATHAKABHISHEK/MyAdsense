'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewspaperLogo = sequelize.define('NewspaperLogo', {
    newspaperName: DataTypes.STRING,
    newspaperLogo: DataTypes.BLOB
  }, {});
  NewspaperLogo.associate = function(models) {
    // associations can be defined here
  };
  return NewspaperLogo;
};