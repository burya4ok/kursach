import { Component, OnInit } from '@angular/core';
import { ipcRenderer, remote } from 'electron';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  win: Electron.BrowserWindow;
  constructor() {

  }

  toStudent() {
    this.win = remote.getCurrentWindow();
    this.win.hide();
    this.win.setSize(1000, 600);
    this.win.center();
    this.win.show();
  }

  toTeacher() {
    this.win = remote.getCurrentWindow();
    this.win.hide();
    this.win.setSize(1000, 600);
    this.win.center();
    this.win.show();
  }

  close() {
    ipcRenderer.send('closeLogin', function () {
    })
  }

  ngOnInit() {

  }

}
