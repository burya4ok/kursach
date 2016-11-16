'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getCurriculum', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Curriculum.getCurriculum();
    }));

    ipcMain.on('setCurriculum', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Curriculum.setCurriculum(data);
    }));



};