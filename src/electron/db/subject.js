'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getSubject', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Subject.getSubject();
    }));
};