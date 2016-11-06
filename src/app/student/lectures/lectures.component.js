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
var path = require('path');
var login_service_1 = require("../../services/login.service");
var lectures_service_1 = require("../../services/lectures.service");
var platform_browser_1 = require("@angular/platform-browser");
var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        core_1.Pipe({ name: 'safe' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SafePipe);
    return SafePipe;
}());
exports.SafePipe = SafePipe;
var StudentLecturesComponent = (function () {
    function StudentLecturesComponent(loginService, lecturesService) {
        this.loginService = loginService;
        this.lecturesService = lecturesService;
        this.lectures = lecturesService.getPartLecturesInfo();
        this.setLecture(this.lectures[0]);
    }
    StudentLecturesComponent.prototype.setLecture = function (lecture) {
        this.currentLecture = lecture;
        this.currentLecture.viewerPath = path.normalize(path.join('./pdfjs/viewer.html?file=' + lecture.path));
    };
    StudentLecturesComponent.prototype.ngOnInit = function () {
        this.loginService.setTitle('Лекції');
    };
    StudentLecturesComponent = __decorate([
        core_1.Component({
            selector: 'app-lectures',
            templateUrl: './lectures.component.html',
            styleUrls: ['./lectures.component.css'],
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, lectures_service_1.LecturesService])
    ], StudentLecturesComponent);
    return StudentLecturesComponent;
}());
exports.StudentLecturesComponent = StudentLecturesComponent;
//# sourceMappingURL=lectures.component.js.map