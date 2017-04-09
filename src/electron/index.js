const electron = require('electron');
const {app} = electron;
const Promise = require('bluebird');
const loginWindow = require('./loginWindow');
const mainWindow = require('./mainWindow');
const db = require('./db');
const models = require('../db/models');
require('electron-reload')(__dirname);

loginWindow(electron);
db(electron);
mainWindow(electron);


app.on('ready', Promise.coroutine(function *() {
    let type = yield models.Config.getTypeOfUser();
    let subject = yield models.Subject.getSubject();
    if (type === 'student' || type === 'teacher') {
        mainWindow.create(null, {type: type, name: subject.name});
    } else {
        loginWindow.create();
    }
}));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

