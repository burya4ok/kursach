import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']

})
export class StudentComponent implements OnInit {
  win: Electron.BrowserWindow;

  constructor() { }

  exit() {
    this.win = remote.getCurrentWindow();
    this.win.hide();
    this.win.setSize(500, 370);
    this.win.center();
    this.win.show();
  }

  ngOnInit() {
  }
}
