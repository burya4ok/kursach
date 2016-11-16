'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('trainingUnits',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                code: {
                    type: Sequelize.TEXT,
                },
                name: {
                    type: Sequelize.TEXT,
                },
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('trainingUnits');
    }
};
