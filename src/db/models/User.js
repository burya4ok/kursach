var Promise = require('bluebird');
var coroutine = Promise.coroutine;


module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'users',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            checkPassword: coroutine(function *(type, password) {
                let user = yield User.findOne({
                    where: {
                        type: type
                    },
                    plain: true
                });
                return user.password === password;
            }),
            setNewPassword: coroutine(function *(type, password, newPassword) {
                let user = yield User.findOne({
                    where: {
                        type: type
                    },
                    plain: true
                });
                if (user.password === password) {
                    yield User.update({
                        where: {
                            type: type
                        },
                        password: newPassword
                    });
                    return true;
                }
                return false;
            })
        }
    });
    return User;
};