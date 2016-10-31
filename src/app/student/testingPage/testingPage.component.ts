import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {LoginService} from "../../services/login.service";
import {TestingService} from "../../services/testing.service";


@Component({
  selector: 'app-testingPage',
  templateUrl: './testingPage.component.html',
  styleUrls: ['./testingPage.component.css'],
  providers: [TestingService]

})
export class TestingPageComponent implements OnInit {
  win: Electron.BrowserWindow;
  title: string;
  test: any;
  result: number[];
  showResult: boolean;
  tempResult: number;
  g: number;
  sumResult: number;

  procent: number;
  ball: number;
  public question: any;
  i: number;
  constructor(private testingService: TestingService) {
    this.result = [];
    this.tempResult = null;
    this.showResult = false;
    this.g = 0;
    this.sumResult = 0;
    this.procent = 0;
    this.ball = 0;
  }

  saveResult(data) {
    this.tempResult = data;
  }

  checkResult() {
    for (var item of this.test) {
      if (item.good == this.result[this.g]) {
        this.sumResult++;
      }
      this.g++;
    }
    this.procent = (this.sumResult / this.test.length) * 100;
    console.log(this.test.length);
    console.log(this.sumResult);
    console.log(this.procent);
    if (this.procent <= 20) {
      this.ball = 1;
    } else if (this.procent <= 40) {
      this.ball = 2;
    } else if (this.procent <= 60) {
      this.ball = 3;
    } else if (this.procent <= 80) {
      this.ball = 4;
    } else if (this.procent <= 100) {
      this.ball = 5;
    }
  }

  goNextQuestion() {
    this.result.push(this.tempResult);
    this.i++;
    if (this.i < this.test.length ) {
      this.question = this.test[this.i];
    } else {
      this.showResult = true;
      this.checkResult();
    }
  }


  ngOnInit() {
    remote.getCurrentWindow().maximize();
    this.test = this.testingService.getAllTest();
    console.log(this.test);
    this.i = 0;
    this.question = this.test[this.i];

  }
}
