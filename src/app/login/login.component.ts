import {Component} from '@angular/core';
import {ipcRenderer, remote} from 'electron';
import {LoginService} from "../services/login.service";
import {SubjectService} from "../services/subject.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService],
})
export class LoginComponent  {
    win: Electron.BrowserWindow;
    teacher: boolean;
    student: boolean;
    placeholder: string;
    password: string;
    subject: any;

    constructor(private loginService: LoginService,
                private subjectService: SubjectService) {
        this.student = false;
        this.teacher = false;
        this.placeholder = 'Пароль';
        this.password = '';
        this.subject = this.subjectService.getSubject();
    }

    toStudent = () => {
        this.focusInput();
        this.student = true;
        this.teacher = false;
    };

    toTeacher = () => {
        this.focusInput();
        this.teacher = true;
        this.student = false;

    };

    private focusInput = () => {
        if (!this.student && !this.teacher) {
            setTimeout(() => {
                $('md-input.login-content input').focus();
            }, 100);
        } else {
            $('md-input.login-content input').focus();
        }
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
        let checkPassword = this.loginService.checkPassword(type, this.password);
        if (checkPassword) {
            this.win.hide();
            this.loginService.setTypeOfUser(type);
            ipcRenderer.send('mainWindow', {type: type, name: this.subjectService.getSubject().name});
        } else {
            this.password = '';
            this.placeholder = 'Введіть вірний пароль';
            $('md-input.login-content .md-input-placeholder').css('color', 'red')
        }
    };
}
