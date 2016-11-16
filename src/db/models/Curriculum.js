var Promise = require('bluebird');
var coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var Curriculum = sequelize.define('Curriculum', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        trainingYear: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        semesters: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        amountOfHours: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        lectures: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        practicalWork: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        laboratory: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        selfStudy: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        workshops: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        typeOfControl: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'curriculum',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            getCurriculum: coroutine(function *() {
                return yield Curriculum.findAll({ plain: true });
            }),
            setCurriculum: coroutine(function *(curriculum) {
                try {
                    yield Curriculum.upsert(curriculum);
                } catch (e) {
                    if (e) {
                        return false;
                    }
                }
                return true;
            })
        }
    });
    return Curriculum;
};