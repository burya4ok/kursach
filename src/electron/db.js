const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../db/models');

    ipcMain.on('getTypeOfUser', Promise.coroutine(function *(event, data) {
        let type = yield db.Config.getTypeOfUser();
        event.returnValue = type;
    }));

    ipcMain.on('setTypeOfUser', Promise.coroutine(function *(event, data) {
        yield db.Config.setTypeOfUser(data);
    }));

    ipcMain.on('deleteTypeOfUser', Promise.coroutine(function *(event, data) {
        yield db.Config.deleteTypeOfUser();

    }));

};