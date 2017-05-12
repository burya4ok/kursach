'use strict';


const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const coroutine = Promise.coroutine;
const QueryHelper = require('../helpers/queryHelper');


module.exports = function (sequelize, DataTypes) {
    var AdditionalMaterials = sequelize.define('AdditionalMaterials', {
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
        tableName: 'additional-materials',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            countMaterials: coroutine(function *() {
                return yield AdditionalMaterials.count();
            }),
            getAllMaterials: coroutine(function *(loadOptions) {
                let query = {};
                let queryHelper = new QueryHelper(query, loadOptions);
                queryHelper
                    .PageByOptions()
                    .SortByOptions()
                    .FilterByOptions();
                return yield AdditionalMaterials.findAll(query);
            }),
            getMaterialsByType: coroutine(function *(selectors) {
                let materials = yield AdditionalMaterials.findAll({
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
                        value: 'presentation',
                        title: 'Презентація'
                    },
                    {
                        value: 'video',
                        title: 'Відео'
                    },
                    {
                        value: 'book',
                        title: 'Книга'
                    }
                ]
            }),
            insertMaterial: coroutine(function *(material) {
                let newPlace = path.join(__dirname, '../../../dist/assets/docs', material.file.replace(/.*[\/|\\](.*)/g, '$1'));
                fse.copySync(material.file, newPlace);
                material.file = material.file.replace(/.*[\/|\\](.*)/g, '$1');

                yield AdditionalMaterials.create(material);
                return true;
            }),
            updateMaterial: coroutine(function *(material) {
                let current = yield AdditionalMaterials.findOne({
                    where: {
                        id: material.id
                    }
                });
                if (current.file !== material.file) {
                    let newPlace = path.join(__dirname, '../../../dist/assets/docs', material.file.replace(/.*[\/|\\](.*)/g, '$1'));
                    fse.copySync(material.file, newPlace);
                    material.file = newPlace;
                }

                yield AdditionalMaterials.upsert(
                    material,
                    {
                        where: {
                            id: material.id
                        }
                    });
                return true;
            }),
            deleteMaterial: coroutine(function *(id) {
                let material = yield AdditionalMaterials.findAll({
                    where: {
                        id: id
                    },
                    plain: true
                });
                if (material.file && fs.lstatSync(path.join(__dirname, '../../../dist/assets/docs',material.file)).isFile()) {
                    fse.removeSync(path.join(__dirname, '../../../dist/assets/docs',material.file));
                }
                yield AdditionalMaterials.destroy({
                    where: {
                        id: id
                    }
                });
                return true;
            })
        }
    });
    return AdditionalMaterials;
};