'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Test', [
            {
                theme: 1,
                question: 'Test question',
                answer1: 'Test answer1',
                answer2: 'Test answer2',
                answer3: 'Test answer3',
                answer4: 'Test answer4',
                good: 1,
                image: '../dist/assets/img/test-img.jpg',
            },
            {
                theme: 2,
                question: '2Test question',
                answer1: '2Test answer1',
                answer2: '2Test answer2',
                answer3: '2Test answer3',
                answer4: '2Test answer4',
                good: 2,
                image: '../dist/assets/img/test-img.jpg',
            },
            {
                theme: 3,
                question: '3Test question',
                answer1: '3Test answer1',
                answer2: '3Test answer2',
                answer3: '3Test answer3',
                answer4: '3Test answer4',
                good: 3,
                image: '../dist/assets/img/test-img.jpg',
            },
            {
                theme: 4,
                question: '4Test question',
                answer1: '4Test answer1',
                answer2: '4Test answer2',
                answer3: '4Test answer3',
                answer4: '4Test answer4',
                good: 4,
                image: '../dist/assets/img/test-img.jpg',
            },
            {
                theme: 5,
                question: '5Test question',
                answer1: '5Test answer1',
                answer2: '5Test answer2',
                answer3: '5Test answer3',
                answer4: '5Test answer4',
                good: 2,
                image: '../dist/assets/img/test-img.jpg',
            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Test', null, {});
    }
};
