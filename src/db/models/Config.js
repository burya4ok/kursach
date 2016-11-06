var Promise = require('bluebird');
var coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var Config = sequelize.define('Config', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        key: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'configs',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            getTypeOfUser: coroutine(function *() {
                let type = yield Config.findOne({
                    where: {
                        key: 'typeOfUser'
                    },
                    plain: true
                });
                return type ? type.value : null;
            }),
            setTypeOfUser: coroutine(function *(type) {
                yield Config.upsert({
                    key: 'typeOfUser',
                    value: type
                });
            }),
            deleteTypeOfUser: coroutine(function *() {
                yield Config.destroy({
                    where: {
                        key: 'typeOfUser'
                    }
                });
            })
        }
    });
    return Config;
};