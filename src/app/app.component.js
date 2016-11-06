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
var login_service_1 = require("./services/login.service");
var electron_1 = require('electron');
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(loginService, router) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        router.events.subscribe(function (val) {
            _this.typeOfUser = _this.loginService.getTypeOfUser();
        });
        this.loginService = loginService;
        setInterval(function () {
            _this.title = _this.loginService.getTitle();
        }, 100);
    }
    AppComponent.prototype.exit = function () {
        this.loginService.deleteTypeOfUser();
        electron_1.ipcRenderer.send('loginWindow');
    };
    AppComponent.prototype.isActive = function () {
        return window.location.pathname.indexOf('login') > -1 ||
            window.location.pathname.indexOf('testingPage') > -1;
    };
    AppComponent.prototype.isTeacher = function () {
        return this.typeOfUser === 'teacher';
    };
    AppComponent.prototype.isStudent = function () {
        return this.typeOfUser === 'student';
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map