import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
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
