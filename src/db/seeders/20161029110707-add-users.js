'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                type: 'student',
                password: 1111
            },
            {
                type: 'teacher',
                password: 2222
            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
