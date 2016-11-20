'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('curriculum', [{
            trainingYear: '4.',
            semesters: '7.',
            amountOfHours: 54,
            lectures: 12,
            practicalWork: null,
            laboratory: 14,
            selfStudy: 28,
            workshops: null,
            typeOfControl: 'Залік.',
        }], {});
    },

    down: function (queryInterface, Sequelize) {

         return queryInterface.bulkDelete('curriculum', null, {});
    }
};
