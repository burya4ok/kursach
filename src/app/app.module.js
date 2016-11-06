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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var material_1 = require('@angular/material');
var file_upload_module_1 = require('ng2-file-upload/components/file-upload/file-upload.module');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var login_component_1 = require('./login/login.component');
var teacher_component_1 = require('./teacher/teacher.component');
var student_component_1 = require('./student/student.component');
var testing_component_1 = require('./student/testing/testing.component');
var testingPage_component_1 = require('./student/testingPage/testingPage.component');
var lectures_component_1 = require('./student/lectures/lectures.component');
var lectures_component_2 = require('./teacher/lectures/lectures.component');
var login_service_1 = require("./services/login.service");
var testing_service_1 = require("./services/testing.service");
var lectures_service_1 = require("./services/lectures.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                teacher_component_1.TeacherComponent,
                student_component_1.StudentComponent,
                testing_component_1.TestingComponent,
                testingPage_component_1.TestingPageComponent,
                lectures_component_1.StudentLecturesComponent,
                lectures_component_2.TeacherLecturesComponent,
                lectures_component_1.SafePipe
            ],
            imports: [
                file_upload_module_1.FileUploadModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.routing,
                material_1.MaterialModule.forRoot()
            ],
            providers: [app_routing_module_1.appRoutingProviders, login_service_1.LoginService, testing_service_1.TestingService, lectures_service_1.LecturesService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map