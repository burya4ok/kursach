import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-testingPage',
  templateUrl: './testingPage.component.html',
  styleUrls: ['./testingPage.component.css'],
  providers: [LoginService]

})
export class TestingPageComponent implements OnInit {
  win: Electron.BrowserWindow;
  title: string;
  constructor(private loginService: LoginService) {
    this.title = 'Testing';
  }


  ngOnInit() {
    remote.getCurrentWindow().maximize();
  }
}
