"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var electron_1 = require('electron');
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.setTypeOfUser = function (type) {
        electron_1.ipcRenderer.send('setTypeOfUser', type);
    };
    LoginService.prototype.getTypeOfUser = function () {
        return electron_1.ipcRenderer.sendSync('getTypeOfUser');
    };
    LoginService.prototype.deleteTypeOfUser = function () {
        electron_1.ipcRenderer.send('deleteTypeOfUser');
    };
    LoginService.prototype.checkPassword = function (type, password) {
        return electron_1.ipcRenderer.sendSync('checkPassword', { type: type, password: password });
    };
    LoginService.prototype.setTitle = function (title) {
        this.title = title;
    };
    ;
    LoginService.prototype.getTitle = function () {
        return this.title;
    };
    ;
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map