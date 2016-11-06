var Promise = require('bluebird');
var coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var Subject = sequelize.define('Subject', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        mainImg: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'subjects',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            getSubject: coroutine(function *() {
               return yield Subject.findAll({ plain: true });
            })
        }
    });
    return Subject;
};