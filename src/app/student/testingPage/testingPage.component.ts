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
  tempResult: number;
  radioButtonAnswer: any;
  public question: any;
  i: number;
  constructor(private testingService: TestingService) {
    this.result = [];
    this.tempResult = null;
  }

  saveResult(data) {
    this.tempResult = data;
  }

  goNextQuestion() {
    this.i++;
    this.question = this.test[this.i];
    this.result.push(this.tempResult);
    this.radioButtonAnswer.checked = false;
  }


  ngOnInit() {
    remote.getCurrentWindow().maximize();
    this.test = this.testingService.getAllTest();
    console.log(this.test);
    this.i = 0;
    this.question = this.test[this.i];

  }
}
