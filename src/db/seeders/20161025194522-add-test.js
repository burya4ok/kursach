'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Test', [
            {
                id: '1',
                theme: 'Test theme',
                question: 'Test question',
                answer1: 'Test answer1',
                answer2: 'Test answer2',
                answer3: 'Test answer3',
                answer4: 'Test answer4',
                good: 'Test good'
            },
            {
                id: '2',
                theme: '2Test theme',
                question: '2Test question',
                answer1: '2Test answer1',
                answer2: '2Test answer2',
                answer3: '2Test answer3',
                answer4: '2Test answer4',
                good: '2Test good'
            },
            {
                id: '3',
                theme: '3Test theme',
                question: '3Test question',
                answer1: '3Test answer1',
                answer2: '3Test answer2',
                answer3: '3Test answer3',
                answer4: '3Test answer4',
                good: '3Test good'
            },
            {
                id: '4',
                theme: '4Test theme',
                question: '4Test question',
                answer1: '4Test answer1',
                answer2: '4Test answer2',
                answer3: '4Test answer3',
                answer4: '4Test answer4',
                good: '4Test good'
            },
            {
                id: '5',
                theme: '5Test theme',
                question: '5Test question',
                answer1: '5Test answer1',
                answer2: '5Test answer2',
                answer3: '5Test answer3',
                answer4: '5Test answer4',
                good: '5Test good'
            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Test', null, {});
    }
};
