var Promise = require('bluebird');
var coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var Theme = sequelize.define('Theme', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        theme: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'Theme',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            getAllTheme: coroutine(function *() {
                return yield Theme.findAll();
            }),
            createTheme: coroutine(function *(tempTheme) {
                return yield Theme.create({theme: tempTheme});
            }),
            destroyTheme: coroutine(function *(tempId) {
                return yield Theme.destroy({where: {id: tempId}});
            }),
            getThemeByName: coroutine(function *(tempTheme) {
                return yield Theme.findAll({where: {theme: tempTheme}});
            }),
            getThemeById: coroutine(function *(tempId) {
                return yield Theme.findAll({where: {id: tempId}});
            })

        }
    });
    return Theme;
};