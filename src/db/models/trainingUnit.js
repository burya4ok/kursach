var Promise = require('bluebird');
var coroutine = Promise.coroutine;
const QueryHelper = require('../helpers/queryHelper');


module.exports = function (sequelize, DataTypes) {
    var TrainingUnit = sequelize.define('TrainingUnit', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'trainingUnits',
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            countTrainingUnits: coroutine(function *() {
                return yield TrainingUnit.count();
            }),
            getTrainingUnits: coroutine(function *(loadOptions) {
                let query = {};
                let queryHelper = new QueryHelper(query, loadOptions);
                queryHelper
                    .PageByOptions()
                    .SortByOptions()
                    .FilterByOptions();
                return yield TrainingUnit.findAll(query);
            }),
            insertTrainingUnits: coroutine(function *(data) {
                yield TrainingUnit.create(data);
                return true;

            }),
            updateTrainingUnits: coroutine(function *(id, data) {
                yield TrainingUnit.update(
                    {
                        code: data.code,
                        name: data.name,

                    },
                    {
                        where: {
                            id: id
                        }
                    }
                );
                return true;
            }),
            deleteTrainingUnits: coroutine(function *(id) {
                yield TrainingUnit.destroy({
                    where: {
                        id: id
                    }
                });
                return true;
            })
        }
    });
    return TrainingUnit;
};