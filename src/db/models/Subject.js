const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const coroutine = Promise.coroutine;


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
            }),
            setSubject: coroutine(function *(data) {
                if (data.path) {
                    let newPlace = path.join(__dirname, '../../../dist/assets/img', data.path.replace(/.*[\/|\\](.*)/g, '$1'));
                    fse.copySync(data.path, newPlace);
                }
                yield Subject.upsert(data);
                return true;
            })
        }
    });
    return Subject;
};