const newspaperDAO = require("../dao/newspaperDAO").newspaperDAO;

class NewspaperController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      "/get_newspaper_language",
      this.getNewspaperLanguage.bind(this)
    );
    this.router.get(
      "/get_newspaper_category",
      this.getNewspaperCategory.bind(this)
    );
  }

  getNewspaperLanguage(req, res, next) {
    newspaperDAO()
      .getNewspaperLanguage()
      .then(languages => {
        res.send({ languages });
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }

  getNewspaperCategory(req, res, next) {
    newspaperDAO()
      .getNewspaperCategory()
      .then(adCategory => {
        res.send({ adCategory });
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }
}

const newspaperController = newspaperRouter => {
  return new NewspaperController(newspaperRouter);
};

module.exports = {
  newspaperController
};
