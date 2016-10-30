'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getAllTest', Promise.coroutine(function *(event) {
        event.returnValue = yield db.Test.getAllTest();
    }));

};