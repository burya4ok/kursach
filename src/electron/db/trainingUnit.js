'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getTrainingUnits', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.TrainingUnit.getTrainingUnits(data);
    }));

    ipcMain.on('insertTrainingUnits', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.TrainingUnit.insertTrainingUnits(data);
    }));

    ipcMain.on('updateTrainingUnits', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.TrainingUnit.updateTrainingUnits(data.id, data);
    }));

    ipcMain.on('deleteTrainingUnits', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.TrainingUnit.deleteTrainingUnits(data.id);
    }));

    ipcMain.on('countTrainingUnits', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.TrainingUnit.countTrainingUnits();
    }));

};