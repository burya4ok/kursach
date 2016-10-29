'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getTypeOfUser', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Config.getTypeOfUser();
    }));

    ipcMain.on('setTypeOfUser', Promise.coroutine(function *(event, data) {
        yield db.Config.setTypeOfUser(data);
    }));

    ipcMain.on('deleteTypeOfUser', Promise.coroutine(function *(event, data) {
        yield db.Config.deleteTypeOfUser();

    }));

};