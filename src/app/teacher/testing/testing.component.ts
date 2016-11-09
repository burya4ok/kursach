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
  tests: any;
  newTest: any;


  constructor(private testingService: TestingService) {
    this.title = 'Testing';
  }

  sortTheme(theme) {
    if (theme === "Виберіть тему...") {
      this.newTest = this.tests;
    } else {
      this.newTest = [];
      console.log(this.newTest);
      this.tests.forEach(function (test) {
        if (test.theme === theme) {
          this.newTest.push(test);//fucking crash
          console.log(this.newTest);
        }
      })
    }
  }

  ngOnInit() {
    remote.getCurrentWindow().maximize();
    this.tests = this.testingService.getAllTest();
    this.newTest = this.tests;
  }
}
