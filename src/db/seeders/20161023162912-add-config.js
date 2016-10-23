'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Config', [{
            key: 'typeOfUser',
            value: 'student'
        }], {});
    },

    down: function (queryInterface, Sequelize) {

         return queryInterface.bulkDelete('Config', null, {});
    }
};
