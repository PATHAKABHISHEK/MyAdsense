const userDAO = require("../dao/userDAO").userDAO;
const passwordHashing = require("../services/passwordHashingService")
  .passwordHashing;

/**
 * This is UserController
 * @constructor
 */
class UserController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/signUp", this.signUpUser.bind(this));
    this.router.post("/signIn", this.signInUser.bind(this));
  }
  /**
   * @desc This is a Api of SignUp User
   * @param {Object} req - This is RequestObject
   * @param {Object} res
   * @param {Object} next
   */
  signUpUser(req, res, next) {
    // Fetching Parameters from request body
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailId = req.body.emailId;
    let password = req.body.password;
    let mobileNumber = req.body.mobileNumber;
    userDAO()
      .checkIfUserExists(emailId)
      .then(isExist => {
        if (isExist) {
          console.log("User Already Exists");
          next();
        } else {
          return passwordHashing().hashPassword(password);
        }
      })
      .then(hashedPassword => {
        return userDAO().addUser(
          firstName,
          lastName,
          emailId,
          hashedPassword,
          mobileNumber
        );
      })
      .then(message => {
        if (message) {
          console.log(message);
        }
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }

  signInUser(req, res, next) {
    let emailId = req.body.emailId;
    let password = req.body.password;
    userDAO()
      .returnUser(emailId)
      .then(user => {
        if (user) {
          passwordHashing()
            .comparePassword(password, user.password)
            .then(result => {
              if (result) {
                console.log("valid credentials");
                user.password = null;
                res.send(user);
              } else {
                console.log("invalid credentials");
                next();
              }
            });
        } else {
          console.log("user doesn't exist");
          next();
        }
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }
}

const userController = userRouter => {
  new UserController(userRouter);
};

module.exports = {
  userController
};
