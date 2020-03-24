"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("AdCollections", [
      {
        newspaperName: "indianexpress",
        adCategory: "property",
        adEdition: "Chandigarh",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "indianexpress",
        adCategory: "property",
        adEdition: "Delhi",
        adType: "text",
        adTextPrice: "900",
        adTextWord: "200 Words",
        adDisplayPrice: "500",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "indianexpress",
        adCategory: "property",
        adEdition: "Mumbai",
        adType: "text",
        adTextPrice: "903",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "indianexpress",
        adCategory: "computers",
        adEdition: "Maharashtra",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "hindustantimes",
        adCategory: "property",
        adEdition: "Chandigarh",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "indianexpress",
        adCategory: "personal",
        adEdition: "Delhi",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "indianexpress",
        adCategory: "property",
        adEdition: "recruitment",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "hindu",
        adCategory: "property",
        adEdition: "Chandigarh",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "tribune",
        adCategory: "property",
        adEdition: "Chandigarh",
        adType: "text",
        adTextPrice: "90",
        adTextWord: "20 Words",
        adDisplayPrice: "5000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        newspaperName: "times now",
        adCategory: "property",
        adEdition: "Maharashta",
        adType: "text",
        adTextPrice: "78890",
        adTextWord: "20 Words",
        adDisplayPrice: "3000",
        adDisplaySize: "4 x 4 cm",
        newspaperLanguage: "English",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
