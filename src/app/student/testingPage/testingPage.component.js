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
var TestingPageComponent = (function () {
    function TestingPageComponent(testingService) {
        this.testingService = testingService;
        this.result = [];
        this.tempResult = null;
        this.showResult = false;
        this.g = 0;
        this.sumResult = 0;
        this.procent = 0;
        this.ball = 0;
        this.success = false;
        this.wrong = false;
    }
    TestingPageComponent.prototype.saveResult = function (data) {
        this.tempResult = data;
    };
    TestingPageComponent.prototype.checkResult = function () {
        for (var _i = 0, _a = this.test; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.good == this.result[this.g]) {
                this.sumResult++;
            }
            this.g++;
        }
        this.procent = (this.sumResult / this.test.length) * 100;
        console.log(this.test.length);
        console.log(this.sumResult);
        console.log(this.procent);
        if (this.procent <= 20) {
            this.ball = 1;
        }
        else if (this.procent <= 40) {
            this.ball = 2;
        }
        else if (this.procent <= 60) {
            this.ball = 3;
        }
        else if (this.procent <= 80) {
            this.ball = 4;
        }
        else if (this.procent <= 100) {
            this.ball = 5;
        }
    };
    TestingPageComponent.prototype.goNextQuestion = function () {
        var _this = this;
        if (this.tempResult == this.test[this.i].good) {
            this.success = true;
            this.wrong = false;
        }
        else {
            this.success = false;
            this.wrong = true;
        }
        this.result.push(this.tempResult);
        this.i++;
        this.currentTimeout = window.setTimeout(function () {
            _this.success = false;
            _this.wrong = false;
            if (_this.i < _this.test.length) {
                _this.question = _this.test[_this.i];
            }
            else {
                _this.checkResult();
                _this.showResult = true;
            }
        }, 1000);
    };
    TestingPageComponent.prototype.ngOnInit = function () {
        electron_1.remote.getCurrentWindow().maximize();
        this.test = this.testingService.getAllTest();
        console.log(this.test);
        this.i = 0;
        this.question = this.test[this.i];
    };
    TestingPageComponent = __decorate([
        core_1.Component({
            selector: 'app-testingPage',
            templateUrl: './testingPage.component.html',
            styleUrls: ['./testingPage.component.css'],
            providers: [testing_service_1.TestingService]
        }), 
        __metadata('design:paramtypes', [testing_service_1.TestingService])
    ], TestingPageComponent);
    return TestingPageComponent;
}());
exports.TestingPageComponent = TestingPageComponent;
//# sourceMappingURL=testingPage.component.js.map