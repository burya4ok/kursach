'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('subject',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          name: Sequelize.STRING,
          mainImg: Sequelize.STRING
        });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('subject');
  }
};
