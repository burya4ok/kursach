module.exports = function (electron) {
    const { app, BrowserWindow, ipcMain} = electron;
    let win = null;

    function createWindow(event, data) {
        let options = {
            width: 900,
            height: 600,
            minWidth: 900,
            minHeight: 600,
            show: false
        };
        win = new BrowserWindow(options);
        win.setMenu(null);

        let isStudent = data.type === 'student';

        let htmlPath = isStudent ? `file://${__dirname}/../../dist/student.html`
            : `file://${__dirname}/../../dist/teacher.html`;

        win.loadURL(htmlPath);

        win.on('closed', () => {
            app.quit();
        });

        win.once('ready-to-show', () => {
            let title = isStudent ? 'Режим студента' : 'Режим викладача';
            win.setTitle(data.name + ' - ' + title);
            win.show();
            win.maximize();
        });
    }

    ipcMain.on('mainWindow', createMain);

    module.exports.create = createMain;
    function createMain(event, data) {
        let prevWindow = BrowserWindow.getFocusedWindow();
        if (prevWindow) {
            prevWindow.hide();
            createWindow(event, data);
            prevWindow = null;
        } else {
            createWindow(event, data);
        }
    }
};