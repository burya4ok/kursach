'use strict';


const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var Lectures = sequelize.define('Lectures', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'lectures',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            getFullLecturesInfo: coroutine(function *() {
                let result = [];
                let lectures = yield Lectures.findAll();
                for (let lecture of lectures) {
                    let stat = null;
                    try {
                        stat = fs.statSync(lecture.path);
                    } catch (e) {
                        Lectures.removeLecture(lecture.id);
                    }
                    if (!stat) {
                        continue;
                    }
                    lecture = {
                        id: lecture.id,
                        lestModified: stat.mode,
                        lastModifiedDate: stat.mtime,
                        name: lecture.path.replace(/.*[\/|\\](.*)\..*/g, '$1'),
                        path: lecture.path,
                        size: stat.size,
                        type: 'application/x-msdownload',
                        webkitRelativePath: ''
                    };
                    result.push(lecture)
                }
                return result;
            }),
            getPartLecturesInfo: coroutine(function *() {
                return yield Lectures.findAll();
            }),
            addLectures: coroutine(function *(lectures) {
                for (let lecture of lectures) {
                    yield Lectures.create({
                        path: lecture.path,
                        name: lecture.name,
                    });
                }
                return true;
            }),
            addLecture: coroutine(function *(lecture) {
                let ext = lecture.path.replace(/.*(\..*)/g, '$1');
                if (ext !== '.pdf') {
                    return false;
                }
                let newPlace = path.join(__dirname, '../../../dist/assets/docs', lecture.path.replace(/.*[\/|\\](.*)/g, '$1'));
                fse.copySync(lecture.path, newPlace);
                lecture.path = newPlace;

                yield Lectures.create({
                    path: lecture.path,
                    name: lecture.name,
                });
                return true;
            }),
            removeLecture: coroutine(function *(id) {
                let lecture = yield Lectures.findAll({
                    where: {
                        id: id
                    },
                    plain: true
                });
                fse.removeSync(lecture.path);
                yield Lectures.destroy({
                    where: {
                        id: id
                    }
                });
                return true;
            })
        }
    });
    return Lectures;
};