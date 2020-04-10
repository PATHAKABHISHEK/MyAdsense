const User = require("../models/index").User;
const AdRequest = require("../models/index").AdRequest;

class UserDAO {
  checkIfUserExists(emailId) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { emailId: emailId } })
        .then((user) => {
          if (user) {
            resolve(true);
          } else {
            console.log("No");
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addUser(firstName, lastName, emailId, password, mobileNumber) {
    return new Promise((resolve, reject) => {
      User.create({
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password,
        mobileNumber: mobileNumber,
      })
        .then(() => {
          resolve("User Added");
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  returnUser(emailId) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { emailId: emailId } })
        .then((user) => {
          if (user) {
            resolve(user);
          } else {
            resolve({});
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const userDAO = () => {
  return new UserDAO();
};

module.exports = {
  userDAO,
};
