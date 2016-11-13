'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Theme', [
            {
                theme: 'Test theme 1'
            },
            {
                theme: 'Test theme 2'
            },
            {
                theme: 'Test theme 3'
            },
            {
                theme: 'Test theme 4'
            },
            {
                theme: 'Test theme 5'
            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Theme', null, {});
    }
};
