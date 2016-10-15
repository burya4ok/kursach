import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import { ipcRenderer, remote } from 'electron';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  win: Electron.BrowserWindow;
  teacher: boolean;
  student: boolean;

  constructor(private router: Router) {
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
      this.win.maximize();
      this.win.center();
      if (this.student) {
        this.router.navigate(['student']);
      }
      else if (this.teacher) {
        this.router.navigate(['teacher']);
      }
    }
  };

  ngOnInit() {

  }

}
