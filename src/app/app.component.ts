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
    typeOfUser: string;
    constructor(private loginService: LoginService, private router: Router) {
        router.events.subscribe((val) => {
            this.typeOfUser = this.loginService.getTypeOfUser();
        });

            this.loginService = loginService;
        setInterval(() => {
            this.title = this.loginService.getTitle();
        }, 100);}

    exit() {
        //noinspection TypeScriptUnresolvedFunction
        var answer: boolean = confirm("Ви дійсно хочете змінити режим?", "Обережно!");
        if (answer){
            this.loginService.deleteTypeOfUser();
            ipcRenderer.send('loginWindow')
        }
    }

    isActive() {
        return window.location.pathname.indexOf('login') > -1 ||
            window.location.pathname.indexOf('testingPage') > -1;
    }

    hide() {
        return this.loginService.hide;
    }

    isTeacher() {
        return this.typeOfUser === 'teacher'
    }

    isStudent() {
        return this.typeOfUser === 'student'
    }
}
