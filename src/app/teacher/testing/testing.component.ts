import {Component, OnInit} from '@angular/core';
import {remote} from 'electron';
import {TestingService} from "../../services/testing.service";


@Component({
  selector: 'app-teacherTesting',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']

})
export class TeacherTestingComponent implements OnInit {
  win: Electron.BrowserWindow;
  title: string;


  constructor(private testingService: TestingService) {
    this.title = 'Testing';

  }


  ngOnInit() {
    remote.getCurrentWindow().maximize();
  }
}
