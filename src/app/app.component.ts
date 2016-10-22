import {Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from "./services/login.service";
import { remote, ipcRenderer } from 'electron';
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private loginService: LoginService, private location: Location,
              private route: ActivatedRoute){
  }
  exit() {
    this.loginService.deleteTypeOfUser();
    ipcRenderer.send('loginWindow')
  }
}
