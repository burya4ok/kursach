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
var router_1 = require('@angular/router');
var electron_1 = require('electron');
var login_service_1 = require("../services/login.service");
var subject_service_1 = require("../services/subject.service");
var LoginComponent = (function () {
    function LoginComponent(router, loginService, subjectService) {
        var _this = this;
        this.router = router;
        this.loginService = loginService;
        this.subjectService = subjectService;
        this.toStudent = function () {
            _this.student = true;
            _this.teacher = false;
        };
        this.toTeacher = function () {
            _this.teacher = true;
            _this.student = false;
        };
        this.login = function () {
            if (_this.student || _this.teacher) {
                _this.win = electron_1.remote.getCurrentWindow();
                if (_this.student) {
                    _this.openMainWindow('student');
                }
                else if (_this.teacher) {
                    _this.openMainWindow('teacher');
                }
            }
        };
        this.openMainWindow = function (type) {
            _this.loginService.setTypeOfUser(type);
            var checkPassword = _this.loginService.checkPassword(type, _this.password);
            if (checkPassword) {
                _this.win.hide();
                electron_1.ipcRenderer.send('mainWindow');
            }
            else {
                _this.password = '';
                _this.placeholder = 'Введіть вірний пароль';
            }
        };
        this.student = false;
        this.teacher = false;
        this.placeholder = 'Пароль';
        this.password = '';
        this.subject = this.subjectService.subject;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var type = this.loginService.getTypeOfUser();
        if (type === 'student') {
            this.router.navigate(['student']);
        }
        else if (type === 'teacher') {
            this.router.navigate(['teacher']);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [login_service_1.LoginService, subject_service_1.SubjectService],
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, subject_service_1.SubjectService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map