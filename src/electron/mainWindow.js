module.exports = function (electron) {
    const { BrowserWindow, ipcMain} = electron;
    let win = null;

    function createWindow() {
        var options = {
            width: 1000,
            height: 800,
            hide: true
        };
        win = new BrowserWindow(options);
        //win.setMenu(null);

        win.loadURL(`file://${__dirname}/../../dist/index.html`);

        win.on('closed', () => {
            win = null;
        });

        win.once('ready-to-show', () => {
            win.show();
        });
    }

    ipcMain.on('mainWindow', function () {
        let prevWindow =  BrowserWindow.getFocusedWindow();
        prevWindow.hide();
        createWindow();
        prevWindow.close();
    })

};