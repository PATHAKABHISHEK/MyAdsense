'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailId: DataTypes.STRING,
    password: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    userRole: DataTypes.STRING,
    userProfile: DataTypes.BLOB
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};