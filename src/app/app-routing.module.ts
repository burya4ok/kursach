import {NgModule, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {StudentComponent} from "./student/student.component";
import {TestingComponent} from "./student/testing/testing.component";
import {TestingPageComponent} from "./student/testingPage/testingPage.component";
import {LecturesComponent} from "./student/lectures/lectures.component";

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
    path: 'testing',
    component: TestingComponent
  },
  {
    path: 'testingPage',
    component: TestingPageComponent
  },
    {
    path: 'lectures',
    component: LecturesComponent
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
