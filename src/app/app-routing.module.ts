import {NgModule, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {StudentComponent} from "./student/student.component";
import {TestingComponent} from "./student/testing/testing.component";
import {TestingPageComponent} from "./student/testingPage/testingPage.component";
import {StudentLecturesComponent} from "./student/lectures/lectures.component";
import {TeacherLecturesComponent} from "./teacher/lectures/lectures.component";

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent
  },
  {
    path: 'student',
    component: StudentComponent,
  },
  {
    path: 'student/testing',
    component: TestingComponent
  },
  {
    path: 'student/testingPage',
    component: TestingPageComponent
  },
    {
    path: 'student/lectures',
    component: StudentLecturesComponent
  },
  {
    path: 'teacher/lectures',
    component: TeacherLecturesComponent
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

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
