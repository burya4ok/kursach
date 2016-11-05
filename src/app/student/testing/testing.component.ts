import {Component, OnInit} from '@angular/core';
import {remote} from 'electron';
import {TestingService} from "../../services/testing.service";


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']

})
export class TestingComponent implements OnInit {
  win: Electron.BrowserWindow;
  title: string;
  learn: boolean;
  modTest: boolean;
  allTheme: boolean;
  oneTheme: boolean;
  testName: string;
  tests: any;

  constructor(private testingService: TestingService) {
    this.title = 'Testing';
    this.learn = false;
    this.modTest = false;
    this.allTheme = false;
    this.oneTheme = false;
    this.testName = null;
  }

  toLearn = () => {
    this.learn = true;
    this.modTest = false;
    this.testingService.saveAll(this.learn, this.modTest, this.allTheme, this.oneTheme, this.testName);
  };
  toModTest = () => {
    this.learn = false;
    this.modTest = true;
    this.testingService.saveAll(this.learn, this.modTest, this.allTheme, this.oneTheme, this.testName);
  };

  toAllTheme = () => {
    this.allTheme = true;
    this.oneTheme = false;
    this.testName = null;
    this.testingService.saveAll(this.learn, this.modTest, this.allTheme, this.oneTheme, this.testName);
  };
  toOneTheme = () => {
    this.allTheme = false;
    this.oneTheme = true;
    this.testingService.saveAll(this.learn, this.modTest, this.allTheme, this.oneTheme, this.testName);
  };

  saveSelectedTheme(value) {
    this.testName = value;
    this.testingService.saveAll(this.learn, this.modTest, this.allTheme, this.oneTheme, this.testName);
  }

  ngOnInit() {
    remote.getCurrentWindow().maximize();
    this.tests = this.testingService.getAllTest();
  }
}
