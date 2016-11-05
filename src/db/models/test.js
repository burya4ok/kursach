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
            type: DataTypes.TEXT,
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
                return yield Test.findAll( {where: {theme: testTheme}} );
            })
        }
    });
    return Test;
};