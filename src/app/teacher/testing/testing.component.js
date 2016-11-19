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
var core_1 = require("@angular/core");
var electron_1 = require("electron");
var testing_service_1 = require("../../services/testing.service");
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var fse = require('fs-extra');
var fs = require('fs');
var path = require('path');
var TeacherTestingComponent = (function () {
    function TeacherTestingComponent(testingService) {
        var _this = this;
        this.testingService = testingService;
        this.uploader = new ng2_file_upload_1.FileUploader({ isHTML5: true });
        this.title = 'Testing';
        this.newTest = [];
        this.allTheme = [];
        this.changeTest = false;
        this.changeAddTest = false;
        this.changeAddTheme = false;
        this.testId = null;
        this.saveThemeForAdd = null;
        this.newImg = null;
        this.newTheme = '';
        this.checkBoxForImg = false;
        this.disable = false;
        this.uploader.onAfterAddingFile = function (file) {
            console.log(file);
            console.log(_this.uploader);
        };
    }
    TeacherTestingComponent.prototype.sortTheme = function (theme) {
        if (theme === "Всі теми") {
            this.newTest = this.tests;
            this.saveThemeForAdd = null;
        }
        else {
            this.saveThemeForAdd = theme;
            theme = parseFloat(theme);
            this.newTest = [];
            this.newTest = this.tests.filter(function (test) { return test.theme === theme; });
        }
        this.changeTest = false;
    };
    TeacherTestingComponent.prototype.activeChangeTest = function (data) {
        this.newQuestion = data.question;
        this.newAns1 = data.answer1;
        this.newAns2 = data.answer2;
        this.newAns3 = data.answer3;
        this.newAns4 = data.answer4;
        this.newGood = data.good;
        this.testId = data.id;
        this.disable = true;
        this.changeTest = true;
    };
    TeacherTestingComponent.prototype.confirmChangeTest = function () {
        this.testingService.updateTest(this.testId, this.newQuestion, this.newAns1, this.newAns2, this.newAns3, this.newAns4, this.newGood);
        this.tests = this.testingService.getAllTest();
        this.newTest = this.tests;
        this.changeTest = false;
        this.disable = false;
        alert('Інформація про питання оновлена!!!');
    };
    TeacherTestingComponent.prototype.addQuestion = function () {
        if (this.saveThemeForAdd === null) {
            alert('Виберіть тему');
        }
        else {
            this.newQuestion = '';
            this.newAns1 = '';
            this.newAns2 = '';
            this.newAns3 = '';
            this.newAns4 = '';
            this.newGood = null;
            this.changeAddTest = true;
            this.disable = true;
        }
    };
    TeacherTestingComponent.prototype.confirmAddTest = function () {
        var tempPath;
        if (this.uploader.queue.length > 0) {
            tempPath = this.uploader.queue[0]._file.path;
            this.newImg = '../dist/assets/img/' + this.uploader.queue[0]._file.name;
        }
        else {
            tempPath = '';
            this.newImg === null;
        }
        if (this.newImg === null) {
            tempPath = '';
            this.newImg = '../dist/assets/img/test-img.jpg';
        }
        this.testingService.addQuestion(this.saveThemeForAdd, this.newQuestion, this.newAns1, this.newAns2, this.newAns3, this.newAns4, this.newGood, this.newImg, tempPath);
        this.tests = this.testingService.getAllTest();
        this.sortTheme(this.saveThemeForAdd);
        this.changeAddTest = false;
        this.disable = false;
        this.uploader.clearQueue();
        alert('Питання було створено!!!');
    };
    TeacherTestingComponent.prototype.cancelAddTest = function () {
        this.changeAddTest = false;
        this.changeAddTheme = false;
        this.changeTest = false;
        this.disable = false;
    };
    TeacherTestingComponent.prototype.addTheme = function () {
        this.disable = true;
        this.changeAddTheme = true;
    };
    TeacherTestingComponent.prototype.removeTheme = function () {
        if (this.saveThemeForAdd === null) {
            alert('Виберіть тему для видалення!!!');
        }
        else {
            this.testingService.destroyTheme(this.saveThemeForAdd);
            this.testingService.destroyQuestions(this.saveThemeForAdd);
            this.themeArray = this.testingService.getAllTheme();
            this.tests = this.testingService.getAllTest();
            this.newTest = this.tests;
            this.changeTest = false;
            alert('Тема та всі її питання були видалені!!!');
        }
    };
    TeacherTestingComponent.prototype.removeQuestion = function () {
        this.testingService.destroyQuestion(this.testId);
        this.themeArray = this.testingService.getAllTheme();
        this.tests = this.testingService.getAllTest();
        this.newTest = this.tests;
        this.changeTest = false;
        this.disable = false;
        alert('Питання було видалено!!!');
    };
    TeacherTestingComponent.prototype.confirmAddTheme = function () {
        this.testingService.createTheme(this.newTheme);
        this.themeArray = this.testingService.getAllTheme();
        this.changeAddTheme = false;
        this.disable = false;
        alert('Тема була створена!!!');
    };
    TeacherTestingComponent.prototype.ngOnInit = function () {
        electron_1.remote.getCurrentWindow().maximize();
        this.themeArray = this.testingService.getAllTheme();
        this.tests = this.testingService.getAllTest();
        this.newTest = this.tests;
    };
    TeacherTestingComponent = __decorate([
        core_1.Component({
            selector: 'app-teacherTesting',
            templateUrl: './testing.component.html',
            styleUrls: ['./testing.component.css']
        }), 
        __metadata('design:paramtypes', [testing_service_1.TestingService])
    ], TeacherTestingComponent);
    return TeacherTestingComponent;
}());
exports.TeacherTestingComponent = TeacherTestingComponent;
//# sourceMappingURL=testing.component.js.map