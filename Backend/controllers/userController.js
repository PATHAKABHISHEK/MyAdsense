const userDAO = require("../dao/userDAO").userDAO;
const passwordHashing = require("../services/passwordHashingService")
  .passwordHashing;

class UserController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/signUp", this.signUpUser.bind(this));
    this.router.post("/signIn", this.signInUser.bind(this));
  }

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
          return new Promise();
        }
      })
      .then(() => {
        return passwordHashing().hashPassword(password);
      })
      .then(hashedPassword => {
        return addUser(
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
      });
  }

  signInUser(req, res, next) {}
}

const userController = userRouter => {
  new UserController(userRouter);
};

module.exports = {
  userController
};
