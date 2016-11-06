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
var LecturesService = (function () {
    function LecturesService() {
    }
    LecturesService.prototype.getFullLecturesInfo = function () {
        return electron_1.ipcRenderer.sendSync('getFullLecturesInfo');
    };
    LecturesService.prototype.getPartLecturesInfo = function () {
        return electron_1.ipcRenderer.sendSync('getPartLecturesInfo');
    };
    LecturesService.prototype.addLectures = function (lectures) {
        return electron_1.ipcRenderer.sendSync('addLectures', { lectures: lectures });
    };
    LecturesService.prototype.addLecture = function (lecture) {
        return electron_1.ipcRenderer.sendSync('addLecture', { lecture: lecture });
    };
    LecturesService.prototype.removeLecture = function (id) {
        return electron_1.ipcRenderer.sendSync('removeLecture', { id: id });
    };
    LecturesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LecturesService);
    return LecturesService;
}());
exports.LecturesService = LecturesService;
//# sourceMappingURL=lectures.service.js.map