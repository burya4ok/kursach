var Promise = require('bluebird');
var coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var Test = sequelize.define('Test', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        theme: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        answer1: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        answer2: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        answer3: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        answer4: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        good: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        }

    }, {
        tableName: 'Test',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            getAllTest: coroutine(function *() {
                return yield Test.findAll();
            }),
            getTest: coroutine(function *(testTheme) {
                return yield Test.findAll({where: {theme: testTheme}});
            }),
            updateTest: coroutine(function *(testId, testQuestion, testAns1, testAns2, testAns3, testAns4, testGood) {
                return yield Test.update({question: testQuestion, answer1: testAns1,
                        answer2: testAns2, answer3: testAns3,
                        answer4: testAns4, good: testGood},
                    {where: {id: testId}});
            }),
            addQuestion: coroutine(function *(testTheme, testQuestion, testAns1, testAns2, testAns3, testAns4, testGood, testImg) {
                return yield Test.create({theme: testTheme, question: testQuestion, answer1: testAns1,
                        answer2: testAns2, answer3: testAns3,
                        answer4: testAns4, good: testGood, image: testImg});
            }),
            destroyQuestions: coroutine(function *(tempId) {
                return yield Test.destroy({where: {theme: tempId}});
            }),
            destroyQuestion: coroutine(function *(tempId) {
                return yield Test.destroy({where: {id: tempId}});
            })
        }
    });
    return Test;
};