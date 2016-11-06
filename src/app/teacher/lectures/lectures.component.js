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
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var login_service_1 = require("../../services/login.service");
var lectures_service_1 = require("../../services/lectures.service");
var URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
var TeacherLecturesComponent = (function () {
    function TeacherLecturesComponent(loginService, lecturesService) {
        var _this = this;
        this.loginService = loginService;
        this.lecturesService = lecturesService;
        this.uploader = new ng2_file_upload_1.FileUploader({ isHTML5: true });
        this.hasBaseDropZoneOver = false;
        this.removeLecture = function (item) {
            _this.uploader.removeFromQueue(item);
            _this.lecturesService.removeLecture(item._file.id);
        };
        this.lectures = this.lecturesService.getFullLecturesInfo();
        this.uploader.addToQueue(this.lectures);
        this.uploader.queue.forEach(function (item, index) {
            if (item._file.path === _this.lectures[index].path) {
                item.index = index;
                item.isSuccess = true;
                item.isUploaded = true;
                item.progress = 100;
            }
        });
        this.uploader.onAfterAddingFile = function (file) {
            console.log(file);
        };
        this.uploader.uploadItem = function (item) {
            var index = _this.uploader.queue.indexOf(item);
            var isAdded = _this.lecturesService.addLecture({
                path: item._file.path,
                name: item._file.path.replace(/.*[\/|\\](.*)\..*/g, '$1')
            });
            if (isAdded) {
                _this.uploader.queue[index].isReady = false;
                _this.uploader.queue[index].isUploading = false;
                _this.uploader.queue[index].isSuccess = true;
                _this.uploader.queue[index].isUploaded = true;
                _this.uploader.queue[index].progress = 100;
            }
            else {
                _this.uploader.queue[item.index].isError = true;
            }
        };
    }
    TeacherLecturesComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    TeacherLecturesComponent.prototype.ngOnInit = function () {
        this.loginService.setTitle('Лекції');
    };
    TeacherLecturesComponent = __decorate([
        core_1.Component({
            selector: 'app-lectures',
            templateUrl: './lectures.component.html',
            styleUrls: ['./lectures.component.css'],
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, lectures_service_1.LecturesService])
    ], TeacherLecturesComponent);
    return TeacherLecturesComponent;
}());
exports.TeacherLecturesComponent = TeacherLecturesComponent;
//# sourceMappingURL=lectures.component.js.map