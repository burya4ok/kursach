module.exports = function (electron) {
    const { app, BrowserWindow, ipcMain} = electron;
    let win = null;

    function createWindow() {
        var options = {
            width: 1000,
            height: 800,
            show: false
        };
        win = new BrowserWindow(options);
        //win.setMenu(null);

        win.loadURL(`file://${__dirname}/../../dist/index.html`);

        win.on('closed', () => {
            app.quit();
        });

        win.once('ready-to-show', () => {
            win.show();
            win.maximize();
        });
    }

    ipcMain.on('mainWindow', createMain);

    module.exports.create = createMain;
    function createMain() {
        let prevWindow = BrowserWindow.getFocusedWindow();
        if (prevWindow) {
            prevWindow.hide();
            createWindow();
            prevWindow = null;
        } else {
            createWindow();
        }
    }
};