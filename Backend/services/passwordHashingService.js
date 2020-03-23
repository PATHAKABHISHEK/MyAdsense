const bcrypt = require("bcrypt");
const saltRounds = 10;

class PasswordHashing {
  hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, saltRounds)
        .then(hash => {
          resolve(hash);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  comparePassword(password, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, hashedPassword)
        .then(result => {
          if (result) {
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
}

const passwordHashing = () => {
  return new PasswordHashing();
};

module.exports = {
  passwordHashing
};
