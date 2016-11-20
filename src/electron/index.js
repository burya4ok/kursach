const electron = require('electron');
const {app, BrowserWindow} = electron;
const Promise = require('bluebird');
const loginWindow = require('./loginWindow');
const mainWindow = require('./mainWindow');
const db = require('./db');
const models = require('../db/models');

let win = null;

function createWindow() {
    var options = {
        width: 900,
        height: 500,
        show: false
    };
    win = new BrowserWindow(options);
    win.setMenu(null);

    win.loadURL(`file://${__dirname}/../../dist/index.html`);

    win.on('closed', () => {
        win = null;
    });

    win.once('ready-to-show', Promise.coroutine(function *() {
        let type = yield models.Config.getTypeOfUser();
        if (type === 'student' || type === 'teacher') {
            mainWindow.create(null, type);
        } else {
            loginWindow.create(null, type);
        }
    }))
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
loginWindow(electron);
db(electron);
mainWindow(electron);