'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('lectures',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                path: Sequelize.STRING,
                name: Sequelize.STRING
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('lectures');
    }
};
