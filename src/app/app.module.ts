import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { routing, appRoutingProviders }  from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { TestingComponent } from './testing/testing.component';
import { TestingPageComponent } from './testingPage/testingPage.component';
import {LoginService} from "./services/login.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeacherComponent,
    StudentComponent,
    TestingComponent,
    TestingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [appRoutingProviders, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
