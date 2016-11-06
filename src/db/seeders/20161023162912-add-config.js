'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('configs', [{
            key: 'typeOfUser',
            value: 'student'
        }], {});
    },

    down: function (queryInterface, Sequelize) {

         return queryInterface.bulkDelete('configs', null, {});
    }
};
