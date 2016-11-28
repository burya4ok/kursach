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
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                lectures: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                practicalWork: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                laboratory: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                selfStudy: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                workshops: {
                    type: Sequelize.INTEGER,
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
