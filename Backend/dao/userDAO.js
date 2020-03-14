const User = require("../models/user");

class UserDAO {
  checkIfUserExists(emailId) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { emailId: emailId } })
        .then(user => {
          if (user) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
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
        mobileNumber: mobileNumber
      })
        .then(() => {
          resolve("User Added");
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

const userDAO = () => {
  return new UserDAO();
};

module.exports = {
  userDAO
};
