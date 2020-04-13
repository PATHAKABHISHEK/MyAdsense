const newspaperDAO = require("../dao/newspaperDAO").newspaperDAO;
const newspaperLogoDAO = require("../dao/newspaperLogoDAO").newspaperLogoDAO;

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
    this.router.post(
      "/get_all_newspaper_ad_rate",
      this.getAllNewspaperAdRates.bind(this)
    );
    this.router.get(
      "/get_all_newspaper_logos",
      this.getAllNewspaperLogos.bind(this)
    );
  }

  getNewspaperLanguage(req, res, next) {
    newspaperDAO()
      .getNewspaperLanguage()
      .then((languages) => {
        res.send({ languages });
        next();
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getNewspaperCategory(req, res, next) {
    newspaperDAO()
      .getNewspaperCategory()
      .then((adCategory) => {
        res.send({ adCategory });
        next();
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getNewspaperBasedOnLanguageAndCategory(req, res, next) {
    let language = req.body.language;
    let category = req.body.category;
    newspaperDAO()
      .getNewspaperBasedOnLanguageAndCategory(language, category)
      .then((newspaper) => {
        res.send({ newspaper });
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getNewspaperEdition(req, res, next) {
    let newspaper = req.body.newspaper;
    newspaperDAO()
      .getNewspaperEdition(newspaper)
      .then((newspaperEdition) => {
        res.send({ newspaperEdition });
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getAllNewspaperAdRates(req, res, next) {
    let language = req.body.language;
    let category = req.body.category;
    let newspaper = req.body.newspaper;
    let edition = req.body.edition;
    let adType = req.body.adType;

    newspaperDAO()
      .getAllNewspaperAdRates(language, category, newspaper, edition, adType)
      .then((newspaperAdRates) => {
        res.send(newspaperAdRates);
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }

  getAllNewspaperLogos(req, res, next) {
    newspaperLogoDAO()
      .getAllNewspaperLogoFromDAO()
      .then((allNewspaperLogos) => {
        res.send(allNewspaperLogos);
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }
}

const newspaperController = (newspaperRouter) => {
  return new NewspaperController(newspaperRouter);
};

module.exports = {
  newspaperController,
};
