import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload/components/file-upload/file-upload.module';

import {routing, appRoutingProviders}  from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentComponent} from './student/student.component';
import {TestingComponent} from './student/testing/testing.component';
import {TeacherTestingComponent} from './teacher/testing/testing.component';
import {TestingPageComponent} from './student/testingPage/testingPage.component';
import {StudentLecturesComponent, SafePipe} from './student/lectures/lectures.component';
import {TeacherLecturesComponent} from './teacher/lectures/lectures.component';
import {LoginService} from "./services/login.service";
import {TestingService} from "./services/testing.service";
import {LecturesService} from "./services/lectures.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TeacherComponent,
        StudentComponent,
        TestingComponent,
        TeacherTestingComponent,
        TestingPageComponent,
        StudentLecturesComponent,
        TeacherLecturesComponent,
        SafePipe
    ],
    imports: [
        FileUploadModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MaterialModule.forRoot()
    ],
    providers: [appRoutingProviders, LoginService, TestingService, LecturesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
