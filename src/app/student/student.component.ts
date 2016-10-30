import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],

})
export class StudentComponent implements OnInit {
  win: Electron.BrowserWindow;
  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.setTitle('Студент');

  }
}
