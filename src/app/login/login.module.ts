import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {LoginComponent} from './login.component';
import {LoginService} from "../services/login.service";
import {SubjectService} from "../services/subject.service";
@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
    ],
    providers: [LoginService, SubjectService],
    bootstrap: [LoginComponent]
})
export class LoginModule {
}
