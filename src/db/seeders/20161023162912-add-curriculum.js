'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('curriculum', [{
            trainingYear: '3, 4.',
            semesters: '5, 6, 7.',
            amountOfHours: 351,
            lectures: 114,
            practicalWork: 46,
            laboratory: 30,
            selfStudy: 20,
            workshops: 46,
            typeOfControl: 'Залік, іспит.',
        }], {});
    },

    down: function (queryInterface, Sequelize) {

         return queryInterface.bulkDelete('curriculum', null, {});
    }
};
