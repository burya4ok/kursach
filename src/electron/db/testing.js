'use strict';
const Promise = require('bluebird');

module.exports = function (electron) {
    const {ipcMain} = electron;
    const db = require('../../db/models');

    ipcMain.on('getAllTest', Promise.coroutine(function *(event) {
        event.returnValue = yield db.Test.getAllTest();
    }));
    ipcMain.on('getTest', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Test.getTest(data.testTheme);
    }));
    ipcMain.on('updateTest', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Test.updateTest(data.testId, data.testQuestion, data.testAns1,
            data.testAns2, data.testAns3, data.testAns4, data.testAns5, data.testAns6, data.testGood, data.testImg, data.testPath);
    }));
    ipcMain.on('addQuestion', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Test.addQuestion(data.testTheme, data.testQuestion, data.testAns1,
            data.testAns2, data.testAns3, data.testAns4, data.testAns5, data.testAns6, data.testGood, data.testImg, data.testPath);
    }));
    ipcMain.on('destroyQuestions', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Test.destroyQuestions(data.tempId);
    }));
    ipcMain.on('destroyQuestion', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Test.destroyQuestion(data.tempId);
    }));

    ipcMain.on('getAllTheme', Promise.coroutine(function *(event) {
        event.returnValue = yield db.Theme.getAllTheme();
    }));
    ipcMain.on('createTheme', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Theme.createTheme(data.tempTheme);
    }));
    ipcMain.on('destroyTheme', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Theme.destroyTheme(data.tempId);
    }));
    ipcMain.on('getThemeByName', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Theme.getThemeByName(data.tempTheme);
    }));
    ipcMain.on('getThemeById', Promise.coroutine(function *(event, data) {
        event.returnValue = yield db.Theme.getThemeById(data.tempId);
    }));

};