'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('materials', [
            {
                file: 'D:/kursach/dist/assets/docs/pdf-test.pdf',
                title: 'Title11',
                unit: 'ПП 03.03.01',
                type: 'lectures'
            },
            {
                file: 'D:/kursach/dist/assets/docs/pdf-test.pdf',
                title: 'Title12',
                unit: 'ПП 03.03.01',
                type: 'lectures'
            },
            {
                file: 'D:/kursach/dist/assets/docs/pdf-test.pdf',
                title: 'Title21',
                unit: 'ПП 03.03.01',
                type: 'selfWork'
            },
            {
                file: 'D:/kursach/dist/assets/docs/pdf-test.pdf',
                title: 'Title21',
                unit: 'ПП 03.03.01',
                type: 'selfWork'
            },
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('materials', null, {});
    }
};
