import {Component, OnInit} from '@angular/core';
import {remote, ipcRenderer} from 'electron';
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.css'],
    providers: [LoginService]
})
export class TeacherComponent implements OnInit {
    win: Electron.BrowserWindow;
    title: string;

    constructor(private loginService: LoginService) {
        this.title = 'Teacher'
    }

    ngOnInit() {
    }

}
