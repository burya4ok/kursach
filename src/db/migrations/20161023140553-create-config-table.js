'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('configs',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                key: Sequelize.STRING,
                value: Sequelize.STRING
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('configs');
    }
};
