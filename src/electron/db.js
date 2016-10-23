module.exports = function (electron) {
    const { ipcMain, app, webContents } = electron;
    const db = require('../db/models');

    ipcMain.on('getTypeOfUser', function *(event, data) {
        let type = yield db.Config.findAll({
            where: {
                key: 'typeOfUser'
            }
        });
        ipcMain.send('typeOfUser', type);
    });

    ipcMain.on('setTypeOfUser', function *(event, data) {
        yield db.Config.upsert({
            where: {
                key: 'typeOfUser'
            },
            value: data
        });
    });

    ipcMain.on('deleteTypeOfUser', function *(event, data) {
        yield db.Config.delete({
            where: {
                key: 'typeOfUser'
            }
        });
    });

};