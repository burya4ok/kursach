module.exports = function (electron) {
    const { app, BrowserWindow, ipcMain} = electron;
    let win = null;

    function createWindow() {
        let options = {
            width: 800,
            height: 500,
            minWidth: 800,
            minHeight: 500,
            resizable: false,
            show: false
        };
        win = new BrowserWindow(options);
        win.setMenu(null);

        win.loadURL(`file://${__dirname}/../../dist/index.html`);

        win.on('closed', () => {
            app.quit();
        });

        win.once('ready-to-show', () => {
            win.show();
        });
    }

    ipcMain.on('loginWindow', createLogin);

    module.exports.create = createLogin;

    function createLogin() {
        let prevWindow =  BrowserWindow.getFocusedWindow();
        if (prevWindow) {
            prevWindow.hide();
            createWindow();
            prevWindow = null;
        } else {
            createWindow();
        }
    }
};