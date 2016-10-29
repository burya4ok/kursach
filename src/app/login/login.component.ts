import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {ipcRenderer, remote} from 'electron';
import {LoginService} from "../services/login.service";
import {SubjectService} from "../services/subject.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService, SubjectService],
})
export class LoginComponent implements OnInit {
    win: Electron.BrowserWindow;
    teacher: boolean;
    student: boolean;
    placeholder: string;
    password: string;
    subject: any;

    constructor(private router: Router, private loginService: LoginService,
                private subjectService: SubjectService) {
        this.student = false;
        this.teacher = false;
        this.placeholder = 'Пароль';
        this.password = '';
        this.subject = this.subjectService.subject;
    }

    toStudent = () => {
        this.student = true;
        this.teacher = false;
    };

    toTeacher = () => {
        this.teacher = true;
        this.student = false;
    };

    login = () => {
        if (this.student || this.teacher) {
            this.win = remote.getCurrentWindow();
            if (this.student) {
                this.openMainWindow('student')
            }
            else if (this.teacher) {
                this.openMainWindow('teacher')
            }
        }
    };

    private openMainWindow = (type: string) => {
        this.loginService.setTypeOfUser(type);
        let checkPassword = this.loginService.checkPassword(type, this.password);
        if (checkPassword) {
            this.win.hide();
            ipcRenderer.send('mainWindow');
        } else {
            this.password = '';
            this.placeholder = 'Введіть вірний пароль'
        }
    };

    ngOnInit() {
        let type = this.loginService.getTypeOfUser();
        if (type === 'student') {
            this.router.navigate(['student']);
        } else if (type === 'teacher') {
            this.router.navigate(['teacher']);
        }
    }

}
