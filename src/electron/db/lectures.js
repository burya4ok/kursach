'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const { ipcMain } = electron;
    const db = require('../../db/models');

    ipcMain.on('getFullLecturesInfo', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Lectures.getFullLecturesInfo();
    }));

    ipcMain.on('getPartLecturesInfo', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Lectures.getPartLecturesInfo();
    }));

    ipcMain.on('addLectures', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Lectures.addLectures(data.lectures);
    }));

    ipcMain.on('addLecture', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Lectures.addLecture(data.lecture);
    }));

    ipcMain.on('removeLecture', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Lectures.removeLecture(data.id);
    }));
};