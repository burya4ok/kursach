'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Theme',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                theme: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                }
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Theme');
    }
};
