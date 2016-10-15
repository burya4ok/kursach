import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import { ipcRenderer, remote } from 'electron';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  win: Electron.BrowserWindow;
  teacher: boolean;
  student: boolean;

  constructor(private router: Router, private loginService: LoginService) {
    this.student = false;
    this.teacher = false;
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
    if (this.student || this.teacher){
      this.win = remote.getCurrentWindow();
      this.win.hide();
      if (this.student) {
        this.loginService.setTypeOfUser('student');
        ipcRenderer.send('mainWindow');

      }
      else if (this.teacher) {
        this.loginService.setTypeOfUser('teacher');
        ipcRenderer.send('mainWindow');
      }
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
