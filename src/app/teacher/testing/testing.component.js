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
var login_service_1 = require("../../services/login.service");
var TestingComponent = (function () {
    function TestingComponent(loginService) {
        this.loginService = loginService;
        this.title = 'Testing';
    }
    TestingComponent.prototype.ngOnInit = function () {
        electron_1.remote.getCurrentWindow().maximize();
    };
    TestingComponent = __decorate([
        core_1.Component({
            selector: 'app-testing',
            templateUrl: './testing.component.html',
            styleUrls: ['./testing.component.css'],
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], TestingComponent);
    return TestingComponent;
}());
exports.TestingComponent = TestingComponent;
//# sourceMappingURL=testing.component.js.map