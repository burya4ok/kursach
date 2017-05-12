'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getAllMaterialsAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.getAllMaterials(data);
    }));

    ipcMain.on('getMaterialsByTypeAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.getMaterialsByType(data);
    }));

    ipcMain.on('getTypesAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.getTypes();
    }));

    ipcMain.on('insertMaterialAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.insertMaterial(data);
    }));

    ipcMain.on('updateMaterialAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.updateMaterial(data);
    }));

    ipcMain.on('deleteMaterialAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.deleteMaterial(data.id);
    }));

    ipcMain.on('countMaterialsAdditional', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.AdditionalMaterials.countMaterials();
    }));


};