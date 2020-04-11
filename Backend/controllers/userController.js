require("dotenv").config();
const userDAO = require("../dao/userDAO").userDAO;
const adRequestsDAO = require("../dao/adRequestsDAO").adRequestsDAO;
const passwordHashing = require("../services/passwordHashingService")
  .passwordHashing;
const stripe = require("stripe")("sk_test_o4s7M5bJP8A4FLmyAlLIEPLk005Hq1mZ88");
const emailSenderService = require("../services/emailSenderService")
  .emailSenderService;

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
    this.router.post("/pay", this.pay.bind(this));
    this.router.post("/editProfile", this.editUserProfile.bind(this));
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
        let accountVerificationCode =
          Math.floor(Math.random() * 899999) + 100000;
        let mailOptions = {
          from: process.env.emailId,
          to: emailId,
          subject: "Verify your MyAdsense Account",
          html: `<h3>Successfully Registered on MyAdsense</h3><br/><p>Before Starting Further, You need to verify your Account. Below see your verfication Code and Don't Share it with anybody.</p><br/><h1>${accountVerificationCode}</h1>`,
        };
        emailSenderService().sendEmail(mailOptions);
        return addUserAccountVerificationCode(emailId, accountVerificationCode);
      })
      .then((updatedUser) => {
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
        res.json("Ad Published");
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
  pay(req, res, next) {
    let stripeTokenId = req.body.stripeTokenId;
    let amount = req.body.amount;
    console.log(stripeTokenId);
    stripe.charges
      .create({
        amount: amount,
        source: stripeTokenId,
        currency: "inr",
      })
      .then(() => {
        res.json("Payment Successfull");
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  editUserProfile(req, res, next) {
    let id = req.body.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailId = req.body.emailId;
    let mobileNumber = req.body.mobileNumber;
    let userProfile = req.body.userProfile;
    let changeUserStatus = false;
    userDAO()
      .getUserEmailIdBasedOnIdFromDAO(id)
      .then((user) => {
        if (user.emailId !== emailId) {
          changeUserStatus = true;
        }
        return userDAO().editUserProfileFromDAO(
          id,
          firstName,
          lastName,
          emailId,
          mobileNumber,
          userProfile,
          changeUserStatus
        );
      })
      .then((updatedUser) => {
        res.send(updatedUser);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
}

const userController = (userRouter) => {
  new UserController(userRouter);
};

module.exports = {
  userController,
};
