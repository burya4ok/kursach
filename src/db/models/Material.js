'use strict';


const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const coroutine = Promise.coroutine;
const QueryHelper = require('../helpers/queryHelper');


module.exports = function (sequelize, DataTypes) {
    var Materials = sequelize.define('Materials', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        file: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        unit: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'materials',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            countMaterials: coroutine(function *() {
                return yield Materials.count();
            }),
            getAllMaterials: coroutine(function *(loadOptions) {
                let query = {};
                let queryHelper = new QueryHelper(query, loadOptions);
                queryHelper
                    .PageByOptions()
                    .SortByOptions()
                    .FilterByOptions();
                return yield Materials.findAll(query);
            }),
            getMaterialsByType: coroutine(function *(selectors) {
                let materials = yield Materials.findAll({
                    where: selectors
                });
                for (let material of materials) {
                    material.file = path.join(__dirname, '../../../dist/assets/docs', material.file)
                }
                return materials;
            }),
            getTypes: coroutine(function *() {
                return [
                    {
                        value: 'lecture',
                        title: 'Лекції'
                    },
                    {
                        value: 'selfStudy',
                        title: 'Самостійне вивчення'
                    },
                    {
                        value: 'laboratoryWork',
                        title: 'Лабораторні роботи'
                    },
                    {
                        value: 'practicalWork',
                        title: 'Практичні роботи'
                    },
                    {
                        value: 'controlWork',
                        title: 'Контрольна робота'
                    },
                    {
                        value: 'questionsForExams',
                        title: 'Питання до іспиту'
                    }
                ]
            }),
            insertMaterial: coroutine(function *(material) {
                let ext = material.file.replace(/.*(\..*)/g, '$1');
                if (ext !== '.pdf') {
                    return false;
                }
                let newPlace = path.join(__dirname, '../../../dist/assets/docs', material.file.replace(/.*[\/|\\](.*)/g, '$1'));
                fse.copySync(material.file, newPlace);
                material.file = material.file.replace(/.*[\/|\\](.*)/g, '$1');

                yield Materials.create(material);
                return true;
            }),
            updateMaterial: coroutine(function *(material) {
                let current = yield Materials.findOne({
                    where: {
                        id: material.id
                    }
                });
                if (current.file !== material.file) {
                    let ext = material.file.replace(/.*(\..*)/g, '$1');
                    if (ext !== '.pdf') {
                        return false;
                    }
                    let newPlace = path.join(__dirname, '../../../dist/assets/docs', material.file.replace(/.*[\/|\\](.*)/g, '$1'));
                    fse.copySync(material.file, newPlace);
                    material.file = newPlace;
                }

                yield Materials.upsert(
                    material,
                    {
                        where: {
                            id: material.id
                        }
                    });
                return true;
            }),
            deleteMaterial: coroutine(function *(id) {
                let material = yield Materials.findAll({
                    where: {
                        id: id
                    },
                    plain: true
                });
                if (material.file && fs.lstatSync(path.join(__dirname, '../../../dist/assets/docs',material.file)).isFile()) {
                    fse.removeSync(path.join(__dirname, '../../../dist/assets/docs',material.file));
                }
                yield Materials.destroy({
                    where: {
                        id: id
                    }
                });
                return true;
            })
        }
    });
    return Materials;
};