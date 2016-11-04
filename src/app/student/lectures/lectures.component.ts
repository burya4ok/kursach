import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css'],

})
export class LecturesComponent implements OnInit {
  win: Electron.BrowserWindow;
  constructor(private loginService: LoginService) {
  }


  ngOnInit() {
    this.loginService.setTitle('Лекції');
  }
}
