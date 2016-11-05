import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {remote} from "electron";
import {TestingService} from "../../services/testing.service";
import {createScope} from "@angular/core/src/profile/wtf_impl";

@Component({
  selector: 'app-testingPage',
  templateUrl: './testingPage.component.html',
  styleUrls: ['./testingPage.component.css']

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
  showAllert: boolean;
  success: boolean;
  wrong: boolean;
  procent: number;
  ball: number;
  public question: any;
  i: number;

  currentTimeout: number;

  constructor(private testingService: TestingService, private el: ElementRef, private renderer: Renderer) {
    this.result = [];
    this.tempResult = null;
    this.showResult = false;
    this.g = 0;
    this.sumResult = 0;
    this.procent = 0;
    this.ball = 0;
    this.success = false;
    this.wrong = false;
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
    if (this.tempResult == this.test[this.i].good) {
      this.success = true;
      this.wrong = false;
    } else {
      this.success = false;
      this.wrong = true;
    }

    this.result.push(this.tempResult);
    this.i++;
    this.currentTimeout = window.setTimeout(() => {
      const tmp = document.getElementsByName('radiog_lite');
      this.renderer.setElementProperty(tmp[0], 'checked', false);
      this.renderer.setElementProperty(tmp[1], 'checked', false);
      this.renderer.setElementProperty(tmp[2], 'checked', false);
      this.renderer.setElementProperty(tmp[3], 'checked', false);
      this.success = false;
      this.wrong = false;
      if (this.i < this.test.length) {
        this.question = this.test[this.i];
      } else {
        this.checkResult();
        this.showResult = true;
      }
    }, this.showAllert ? 1000 : 0);
  }


  ngOnInit() {
    remote.getCurrentWindow().maximize();
    if (this.testingService.allTheme) {
      this.test = this.testingService.getAllTest();
    } else if (this.testingService.oneTheme) {
      this.test = this.testingService.getTest();
    }
    if (this.testingService.learn) {
      this.showAllert = true;
    } else if (this.testingService.modTest) {
      this.showAllert = false;
    }
    this.i = 0;
    this.question = this.test[this.i];
  }
}
