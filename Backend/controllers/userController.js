const userDAO = require("../dao/userDAO").userDAO;
const adRequestsDAO = require("../dao/adRequestsDAO").adRequestsDAO;
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
    this.router.post("/requestAd", this.requestAd.bind(this));
    this.router.get("/myRequestedAds", this.getMyRequestedAds.bind(this));
    this.router.get(
      "/getFreshRequestedAds",
      this.getFreshRequestedAds.bind(this)
    );
    this.router.post("/publishAd", this.adPublished.bind(this));
    this.router.get("/myPublishedAds", this.getMyPublishedAds.bind(this));
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
      .then((isExist) => {
        if (isExist === true) {
          console.log("User Already Exists");
          next();
        } else {
          return passwordHashing().hashPassword(password);
        }
      })
      .then((hashedPassword) => {
        return userDAO().addUser(
          firstName,
          lastName,
          emailId,
          hashedPassword,
          mobileNumber
        );
      })
      .then((message) => {
        if (message) {
          console.log(message);
        }
        res.json("Successfully Registered");
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  signInUser(req, res, next) {
    let emailId = req.body.emailId;
    let password = req.body.password;
    userDAO()
      .returnUser(emailId)
      .then((user) => {
        if (user) {
          passwordHashing()
            .comparePassword(password, user.password)
            .then((result) => {
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
      .catch((err) => {
        console.log(err);
        next();
      });
  }
  requestAd(req, res, next) {
    let userId = req.body.userId;
    let newspaperCategory = req.body.newspaperCategory;
    let newspaperName = req.body.newspaperName;
    let newspaperEdition = req.body.newspaperEdition;
    let newspaperLanguage = req.body.newspaperLanguage;
    let adType = req.body.adType;
    let adRate = req.body.adRate;
    let adPublishDate = req.body.adPublishDate;
    let ad = req.body.ad;
    let adStatus = req.body.adStatus;
    let adPublishedBy = req.body.adPublishedBy;
    let adPublishedProof = req.body.adPublishedProof;
    console.log(req.body);
    adRequestsDAO()
      .requestAdFromDAO(
        userId,
        newspaperCategory,
        newspaperName,
        newspaperEdition,
        newspaperLanguage,
        adType,
        adRate,
        adPublishDate,
        ad,
        adStatus,
        adPublishedBy,
        adPublishedProof
      )
      .then((ad) => {
        res.send(ad.userId);
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getMyRequestedAds(req, res, next) {
    let userId = req.body.userId;
    adRequestsDAO()
      .getMyRequestedAdsFromDAO(userId)
      .then((myAdRequests) => {
        res.send(myAdRequests);
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getFreshRequestedAds(req, res, next) {
    adRequestsDAO()
      .getFreshRequestedAdsFromDAO()
      .then((freshAds) => {
        res.send(freshAds);
      })
      .catch((err) => {
        console.log(err);
        next;
      });
  }
  adPublished(req, res, next) {
    let adId = req.body.adId;
    let userId = req.body.userId;
    let adPublishProof = req.body.adPublishProof;

    adRequestsDAO()
      .adPublished(adId, userId, adPublishProof)
      .then((updatedAd) => {
        res.send("Ad Published");
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getMyPublishedAds(req, res, next) {
    let userId = req.body.userId;
    adRequestsDAO()
      .getMyPublishedAdsFromDAO(userId)
      .then((myPublishedAds) => {
        res.send(myPublishedAds);
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }
}

const userController = (userRouter) => {
  new UserController(userRouter);
};

module.exports = {
  userController,
};
