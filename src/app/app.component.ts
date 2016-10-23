import {Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from "./services/login.service";
import { ipcRenderer } from 'electron';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private loginService: LoginService, private router: Router){
  }
  exit() {
    this.loginService.deleteTypeOfUser();
    ipcRenderer.send('loginWindow')
  }
  isActive() {
    return window.location.pathname.indexOf('login') > -1 ||
           window.location.pathname.indexOf('testingPage') > -1;
  }
}
