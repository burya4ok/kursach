import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {remote} from "electron";
import {TestingService} from "../../services/testing.service";
import {LoginService} from "../../services/login.service";
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
    selector: 'app-testingPage',
    templateUrl: './testingPage.component.html',
    styleUrls: ['./testingPage.component.css']

})
export class TestingPageComponent implements OnInit {
    win: Electron.BrowserWindow;
    themeArray: any[];
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
    goodQuestion: number;
    allQuestion: number;
    activeButton: boolean;

    currentTimeout: number;
    minutes: any;
    timeend: any;
    sec: any;

    timerId: any;
    showTimer: boolean;
    setAllTheme: boolean;
    setOneTheme: boolean;

    constructor(private testingService: TestingService, private el: ElementRef,
                private renderer: Renderer, private loginService: LoginService, private st: SimpleTimer) {
        this.result = [];
        this.tempResult = null;
        this.showResult = false;
        this.g = 0;
        this.sumResult = 0;
        this.procent = 0;
        this.ball = 0;
        this.success = false;
        this.wrong = false;
        this.activeButton = false;
        this.goodQuestion = 0;
    }

    saveResult(data) {
        this.tempResult = data;
        this.activeButton = true;
    }

    checkResult() {
        for (var item of this.test) {
            if (item.good == this.result[this.g]) {
                this.sumResult++;
            }
            this.g++;
        }
        this.procent = (this.sumResult / this.test.length) * 100;
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
        if (this.showTimer && (this.timeend === true)) {
            this.ball = 0;
        }
    }

    goNextQuestion() {
        this.activeButton = false;
        if (this.tempResult == this.test[this.i].good) {
            this.goodQuestion++;
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
            this.activeButton = false;
            this.success = false;
            this.wrong = false;
            if (this.i < this.test.length) {
                this.question = this.test[this.i];
                var temp = this.testingService.getThemeById(this.question.theme);
                this.question.theme = temp[0].theme;
            } else {
                this.checkResult();
                this.showResult = true;
            }
        }, this.showAllert ? 1000 : 0);
    }

    timer() {
        if (this.setAllTheme) {
            this.minutes = 59;
            this.sec = 60;
        } else {
            this.minutes = 29;
            this.sec = 60;
        }
        this.timeend = false;
        this.st.newTimer('1sec', 1);
        this.startTimer();
    }

    startTimer() {
        if (this.timeend) {
            this.st.unsubscribe(this.timerId);
        } else {
            this.timerId = this.st.subscribe('1sec', e => this.tick());
        }
    }

    tick() {
        this.sec = parseInt(this.sec);
        if ((this.minutes === 0) && (this.sec === 0)) {
            this.timeend = true;
            this.minutes = 0;
            this.sec = '00';
        } else {

            if (this.sec < 0) {
                this.minutes -= 1;
                this.sec = 60;
            }
            if ((this.sec - 1) < 10) {
                this.sec = parseInt(this.sec);
                this.sec = '0' + (this.sec - 1);
            } else {
                this.sec = parseInt(this.sec);
                this.sec -= 1;
            }
        }
    }

    ngOnInit() {
        remote.getCurrentWindow().maximize();
        this.loginService.setTitle('Тестування');
        this.themeArray = this.testingService.getAllTheme();
        if (this.testingService.allTheme) {
            this.test = this.testingService.getAllTest();
            this.setAllTheme = true;
            this.setOneTheme = false;
        } else if (this.testingService.oneTheme) {
            this.test = this.testingService.getTest();
            this.setAllTheme = false;
            this.setOneTheme = true;
        }
        if (this.testingService.learn) {
            this.showAllert = true;
            this.showTimer = false;
        } else if (this.testingService.modTest) {
            this.showAllert = false;
            this.showTimer = true;
        }
        this.test.sort(function (obj1, obj2) {
            return obj1.theme - obj2.theme;
        });
        this.i = 0;
        this.question = this.test[this.i];
        var temp = this.testingService.getThemeById(this.question.theme);
        this.question.theme = temp[0].theme;
        this.allQuestion = this.test.length;
        if (this.showTimer) {
            this.timer();
        }
    }
}
