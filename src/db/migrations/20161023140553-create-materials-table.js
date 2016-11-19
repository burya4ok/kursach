'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('materials',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },

                file: Sequelize.STRING,
                title: Sequelize.STRING,
                unit: Sequelize.STRING,
                type: Sequelize.STRING
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('materials');
    }
};
