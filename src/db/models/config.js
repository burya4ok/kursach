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
            allowNull: false,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        tableName: 'Config',
        paranoid: true,
        timestamps: false,
        freezeTableName: true
    });
    return Config;
};