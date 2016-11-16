'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('trainingUnits', [{
            code: 'ПП 03.03.01',
            name: 'Основи проектування технологічних процесів'
        }], {});
    },

    down: function (queryInterface, Sequelize) {

         return queryInterface.bulkDelete('trainingUnits', null, {});
    }
};
