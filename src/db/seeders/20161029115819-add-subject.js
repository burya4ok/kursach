'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('subject', [
      {
        name: 'Інструментальні засоби візуального программування',
        mainImg: 'main.jpg'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('subject', null, {});
  }
};
