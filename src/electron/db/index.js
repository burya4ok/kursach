'use strict';
const fs = require('fs');
const path = require('path');
const basename  = path.basename(module.filename);

module.exports = function (electron) {
    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(function (file) {
            require('./' + file)(electron);
        });
};