const AdRequest = require("../models/index").AdRequest;

class AdRequestsDAO {
  requestAdFromDAO(
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
  ) {
    return new Promise((resolve, reject) => {
      AdRequest.create({
        userId: userId,
        newspaperCategory: newspaperCategory,
        newspaperName: newspaperName,
        newspaperEdition: newspaperEdition,
        newspaperLanguage: newspaperLanguage,
        adType: adType,
        adRate: adRate,
        adPublishDate: adPublishDate,
        ad: ad,
        adStatus: adStatus,
        adPublishedBy: adPublishedBy,
        adPublishedProof: adPublishedProof,
      })
        .then((ad) => {
          resolve(ad);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getMyRequestedAdsFromDAO(userId) {
    return new Promise((resolve, reject) => {
      AdRequest.findAll({
        where: {
          userId: userId,
        },
      })
        .then((myAdRequests) => {
          resolve(myAdRequests);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getFreshRequestedAdsFromDAO() {
    return new Promise((resolve, reject) => {
      AdRequest.findAll({
        where: {
          adStatus: "active",
        },
      })
        .then((freshAds) => {
          resolve(freshAds);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  adPublished(adId, userId, adPublishProof) {
    return new Promise((resolve, reject) => {
      AdRequest.update(
        {
          adPublishedBy: userId,
          adPublishedProof: adPublishProof,
        },
        {
          where: {
            id: adId,
          },
        }
      )
        .then((updatedAd) => {
          resolve(updatedAd);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const adRequestsDAO = () => {
  return new AdRequestsDAO();
};

module.exports = {
  adRequestsDAO,
};
