import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";
import {ipcRenderer} from 'electron';
import {Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    title: string;
    constructor(private loginService: LoginService, private router: Router) {
        this.loginService = loginService;
        setInterval(() => {
            this.title = this.loginService.getTitle();
        }, 100);}

    exit() {
        this.loginService.deleteTypeOfUser();
        ipcRenderer.send('loginWindow')
    }

    isActive() {

        return window.location.pathname.indexOf('login') > -1 ||
            window.location.pathname.indexOf('testingPage') > -1;
    }

    isTeacher() {
        return this.loginService.getTypeOfUser() === 'teacher'
    }

    isStudent() {
        return this.loginService.getTypeOfUser() === 'student'
    }
}
