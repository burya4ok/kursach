'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Test',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                theme: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                question: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                answer1: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                answer2: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                answer3: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                answer4: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                good: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                image: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                }
            });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Test');
    }
};
