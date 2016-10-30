import {Component, OnInit} from '@angular/core';
import {remote, ipcRenderer} from 'electron';
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
    win: Electron.BrowserWindow;
    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.setTitle('Вчитель');
    }

}
