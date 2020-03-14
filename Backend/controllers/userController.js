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
    res.send("hello world");
  }

  signInUser(req, res, next) {}
}

const userController = userRouter => {
  new UserController(userRouter);
};

module.exports = {
  userController
};
