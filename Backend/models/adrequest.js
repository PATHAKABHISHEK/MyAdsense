"use strict";
module.exports = (sequelize, DataTypes) => {
  const AdRequest = sequelize.define(
    "AdRequest",
    {
      userId: DataTypes.INTEGER,
      newspaperCategory: DataTypes.STRING,
      newspaperName: DataTypes.STRING,
      newspaperEdition: DataTypes.STRING,
      newspaperLanguage: DataTypes.STRING,
      adType: DataTypes.STRING,
      adRate: DataTypes.STRING,
      adPublishDate: DataTypes.DATE,
      ad: DataTypes.BLOB,
      adStatus: DataTypes.STRING,
      adPublishedBy: DataTypes.INTEGER,
      adPublishedProof: DataTypes.BLOB,
    },
    {}
  );
  AdRequest.associate = function (models) {
    // associations can be defined here
    AdRequest.belongsTo(models.User, {
      foreignKey: "userId",
    });
    AdRequest.belongsTo(models.User, {
      foreignKey: "adPublishedBy",
    });
  };
  return AdRequest;
};
