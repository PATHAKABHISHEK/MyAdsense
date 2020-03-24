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
    this.router.post(
      "/get_newspaper_based_on_language_and_category",
      this.getNewspaperBasedOnLanguageAndCategory.bind(this)
    );
    this.router.post(
      "/get_newspaper_edition",
      this.getNewspaperEdition.bind(this)
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

  getNewspaperBasedOnLanguageAndCategory(req, res, next) {
    let language = req.body.language;
    let category = req.body.category;
    newspaperDAO()
      .getNewspaperBasedOnLanguageAndCategory(language, category)
      .then(newspaper => {
        res.send({ newspaper });
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }

  getNewspaperEdition(req, res, next) {
    let newspaper = req.body.newspaper;
    newspaperDAO()
      .getNewspaperEdition(newspaper)
      .then(newspaperEdition => {
        res.send({ newspaperEdition });
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
