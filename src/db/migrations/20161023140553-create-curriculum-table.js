'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('curriculum',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                trainingYear: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                semesters: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                amountOfHours: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                lectures: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                practicalWork: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                laboratory: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                selfStudy: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                workshops: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                typeOfControl: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('curriculum');
    }
};
