const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;


let win;

function createWindow() {
    var options = {
        width: 500,
        height: 370,
        show: false,
        frame: false,
        resizable: false,
    };
    win = new BrowserWindow(options);

    win.loadURL(`file://${__dirname}/../../dist/index.html`);

    win.on('closed', () => {
        win = null;
});
    win.once('ready-to-show', () => {
        win.show()
})
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

ipcMain.on('closeLogin', function (event, args) {
    app.quit();
});
