'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Theme', [
            {
                theme: 'Внешние компоненты'
            },
            {
                theme: 'Перевод'
            },
            {
                theme: 'Меню'
            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Theme', null, {});
    }
};
