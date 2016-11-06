"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require("./login/login.component");
var teacher_component_1 = require("./teacher/teacher.component");
var student_component_1 = require("./student/student.component");
var testing_component_1 = require("./student/testing/testing.component");
var testingPage_component_1 = require("./student/testingPage/testingPage.component");
var lectures_component_1 = require("./student/lectures/lectures.component");
var lectures_component_2 = require("./teacher/lectures/lectures.component");
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent,
    },
    {
        path: 'teacher',
        component: teacher_component_1.TeacherComponent
    },
    {
        path: 'student',
        component: student_component_1.StudentComponent,
    },
    {
        path: 'testing',
        component: testing_component_1.TestingComponent
    },
    {
        path: 'testingPage',
        component: testingPage_component_1.TestingPageComponent
    },
    {
        path: 'student/lectures',
        component: lectures_component_1.StudentLecturesComponent
    },
    {
        path: 'teacher/lectures',
        component: lectures_component_2.TeacherLecturesComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '*path',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map