const NewspaperLogo = require("../models/index").NewspaperLogo;

class NewspaperLogoDAO {
  getAllNewspaperLogoFromDAO() {
    return new Promise((resolve, reject) => {
      NewspaperLogo.findAll()
        .then((allNewspaperLogos) => {
          resolve(allNewspaperLogos);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const newspaperLogoDAO = () => {
  return new NewspaperLogoDAO();
};

module.exports = {
  newspaperLogoDAO,
};
