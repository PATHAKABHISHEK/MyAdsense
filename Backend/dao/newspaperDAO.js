const AdCollection = require("../models/index").AdCollection;
const Sequelize = require("../models/index").Sequelize;

class NewspaperDAO {
  getNewspaperLanguage() {
    return new Promise((resolve, reject) => {
      let languages = [];
      AdCollection.aggregate("newspaperLanguage", "DISTINCT", {
        plain: false,
      })
        .then((distinctLanguages) => {
          if (distinctLanguages) {
            distinctLanguages.forEach((element) => {
              languages.push(element["DISTINCT"]);
            });
          }
          resolve(languages);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getNewspaperCategory() {
    return new Promise((resolve, reject) => {
      let adCategories = [];
      AdCollection.aggregate("adCategory", "DISTINCT", {
        plain: false,
      })
        .then((distinctCategories) => {
          if (distinctCategories) {
            distinctCategories.forEach((element) => {
              adCategories.push(element["DISTINCT"]);
            });
          }
          resolve(adCategories);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getNewspaperBasedOnLanguageAndCategory(language, category) {
    return new Promise((resolve, reject) => {
      let newspapers = [];
      AdCollection.findAll({
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("newspaperName")),
          "newspaperName",
        ],
        where: {
          newspaperLanguage: language,
          adCategory: category,
        },
      })
        .then((newspaper) => {
          if (newspaper) {
            newspaper.forEach((element) => {
              newspapers.push(element["newspaperName"]);
            });
          }
          resolve(newspapers);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getNewspaperEdition(newspaper) {
    return new Promise((resolve, reject) => {
      let newspaperEditions = [];
      AdCollection.findAll({
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("adEdition")),
          "adEdition",
        ],
        where: {
          newspaperName: newspaper,
        },
      })
        .then((newspaperEdition) => {
          if (newspaperEdition) {
            newspaperEdition.forEach((element) => {
              newspaperEditions.push(element["adEdition"]);
            });
          }
          console.log(newspaperEdition);
          resolve(newspaperEditions);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllNewspaperAdRates(language, category, newspaper, edition, adType) {
    return new Promise((resolve, reject) => {
      AdCollection.findAll({
        attributes: [
          "adTextPrice",
          "adTextWord",
          "adDisplayPrice",
          "adDisplaySize",
          "newspaperName",
        ],
        where: {
          newspaperLanguage: language,
          adCategory: category,
          adEdition: edition,
          adType: adType,
        },
      })
        .then((newspaperAdRate) => {
          if (newspaperAdRate) {
            resolve(newspaperAdRate);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getNewspaperAdRate(language, category, newspaper, edition, adType) {
    return new Promise((resolve, reject) => {
      AdCollection.findOne({
        attributes: [
          "adTextPrice",
          "adTextWord",
          "adDisplayPrice",
          "adDisplaySize",
          "newspaperName",
        ],
        where: {
          newspaperLanguage: language,
          adCategory: category,
          adEdition: edition,
          adType: adType,
          newspaperName: newspaper,
        },
      })
        .then((newspaperAdRate) => {
          if (newspaperAdRate) {
            resolve(newspaperAdRate);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const newspaperDAO = () => {
  return new NewspaperDAO();
};

module.exports = {
  newspaperDAO,
};
