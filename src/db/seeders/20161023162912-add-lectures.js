'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('lectures', [
            {
                path: 'D:/kursach/dist/assets/docs/pdf-test.pdf',
                name: 'Test'
            },
            {
                path: 'D:/kursach/dist/assets/docs/pdf.pdf',
                name: 'pdf'

            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('lectures', null, {});
    }
};
