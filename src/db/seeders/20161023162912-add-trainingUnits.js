'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('trainingUnits', [
            {
                code: 'КЗП.09.02',
                name: 'Психологічні принципи людино-машинної взаємодії'
            }, {
                code: 'КЗП.10.01',
                name: 'Аналіз, проектування та прототипування людино- машинного інтерфейсу '
            }, {
                code: 'КЗП.10.02',
                name: 'Функціональні компоненти та властивості людино- машинного інтерфейсу'
            }, {
                code: 'КЗП.10.03',
                name: 'Обґрунтовування проектних рішень '
            },
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('trainingUnits', null, {});
    }
};
