'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getAllMaterials', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.getAllMaterials(data);
    }));

    ipcMain.on('getMaterialsByType', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.getMaterialsByType(data.type);
    }));

    ipcMain.on('getTypes', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.getTypes();
    }));

    ipcMain.on('insertMaterial', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.insertMaterial(data);
    }));

    ipcMain.on('updateMaterial', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.updateMaterial(data);
    }));

    ipcMain.on('deleteMaterial', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.deleteMaterial(data.id);
    }));

    ipcMain.on('countMaterials', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Materials.countMaterials();
    }));


};