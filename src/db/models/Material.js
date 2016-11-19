'use strict';


const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const coroutine = Promise.coroutine;


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
            getAllMaterials: coroutine(function *() {
                return yield Materials.findAll();
            }),
            getMaterialsByType: coroutine(function *(type) {
                return yield Materials.findAll({
                    where: {
                        type: type
                    }
                });
            }),
            getTypes: coroutine(function *() {
                return [
                    {
                        value: 'lecture',
                        title: 'Лекції'
                    },
                    {
                        value: 'selfWork',
                        title: 'Самостійна робота'
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
                material.file = newPlace;

                yield Materials.create(material);
                return true;
            }),
            updateMaterial: coroutine(function *(material) {
                let ext = material.file.replace(/.*(\..*)/g, '$1');
                if (ext !== '.pdf') {
                    return false;
                }
                let newPlace = path.join(__dirname, '../../../dist/assets/docs', material.file.replace(/.*[\/|\\](.*)/g, '$1'));
                fse.copySync(material.file, newPlace);
                material.file = newPlace;

                yield Materials.upsert(material);
                return true;
            }),
            deleteMaterial: coroutine(function *(id) {
                let material = yield Materials.findAll({
                    where: {
                        id: id
                    },
                    plain: true
                });
                fse.removeSync(material.file);
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