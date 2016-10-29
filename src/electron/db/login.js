'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('checkPassword', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.User.checkPassword(data.type, data.password);
    }));

    ipcMain.on('setNewPassword', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.User.checkPassword(data.type, data.password, data.newPassword);
    }));
};