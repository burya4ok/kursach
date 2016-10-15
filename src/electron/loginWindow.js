module.exports = function (electron) {
    const { BrowserWindow, ipcMain} = electron;
    let win = null;

    function createWindow() {
        var options = {
            width: 800,
            height: 500,
            resizable: false

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

    ipcMain.on('loginWindow', function () {
        let prevWindow =  BrowserWindow.getFocusedWindow();
        createWindow();
        prevWindow.close();
    })

};