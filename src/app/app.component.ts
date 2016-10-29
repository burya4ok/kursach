import {Component, ViewEncapsulation} from '@angular/core';
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
    }

    exit() {
        this.loginService.deleteTypeOfUser();
        ipcRenderer.send('loginWindow')
    }

    reload() {
        this.title = this.loginService.getTitle();
    }

    isActive() {

        return window.location.pathname.indexOf('login') > -1 ||
            window.location.pathname.indexOf('testingPage') > -1;
    }
}
