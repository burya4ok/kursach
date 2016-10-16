import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
  providers: [LoginService]

})
export class TestingComponent implements OnInit {
  win: Electron.BrowserWindow;
  constructor(private loginService: LoginService) { }

  exit() {
    this.loginService.deleteTypeOfUser();
    ipcRenderer.send('loginWindow')

  }

  ngOnInit() {
    remote.getCurrentWindow().maximize();
  }
}
