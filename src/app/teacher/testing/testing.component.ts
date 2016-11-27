import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {remote} from "electron";
import {TestingService} from "../../services/testing.service";
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {LoginService} from "../../services/login.service";
import parseInt = require("core-js/fn/number/parse-int");


const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

@Component({
    selector: 'app-teacherTesting',
    templateUrl: './testing.component.html',
    styleUrls: ['./testing.component.css']

})
export class TeacherTestingComponent implements OnInit {
    win: Electron.BrowserWindow;
    title: string;
    tests: any;
    simpleValue: any;
    img: any;
    newTest: any[];
    themeArray: any[];
    changeTest: boolean;
    changeAddTest: boolean;
    changeAddTheme: boolean;
    newQuestion: string;
    newAns1: string;
    newAns2: string;
    newAns3: string;
    newAns4: string;
    newAns5: string;
    newAns6: string;
    Theme: string;
    newGood: any;
    newTheme: string;
    testId: number;
    saveThemeForAdd: string;
    newImg: any;
    checkBoxForImg: boolean;
    allTheme: any[];
    public uploader: FileUploader = new FileUploader({isHTML5: true});
    disable: boolean;

    showAns: boolean[];
    showDemo: boolean;
    question: {};

    constructor(private testingService: TestingService, private loginService: LoginService, private renderer: Renderer) {
        this.title = 'Testing';
        this.newTest = [];
        this.allTheme = [];
        this.changeTest = false;
        this.changeAddTest = false;
        this.changeAddTheme = false;
        this.testId = null;
        this.saveThemeForAdd = null;
        this.newImg = null;
        this.newTheme = '';
        this.checkBoxForImg = false;
        this.disable = false;
        this.showAns = [true,false,false,false,false];
        this.showDemo = false;

        this.uploader.onAfterAddingFile = (file: any) => {
            console.log(file);
            console.log(this.uploader);
        };
    }

    sortTheme(theme) {
        if (theme === "Всі теми") {
            this.newTest = this.tests;
            this.saveThemeForAdd = null;
        } else {
            this.saveThemeForAdd = theme;
            theme = parseFloat(theme);
            this.newTest = [];
            this.newTest = this.tests.filter(
                test => test.theme === theme);
        }
        this.changeTest = false;
    }

    activeChangeTest(data) {
        var temp = this.testingService.getThemeById(data.theme);
        this.Theme = temp[0].theme;
        this.newQuestion = data.question;
        this.newAns1 = data.answer1;
        this.newAns2 = data.answer2;
        this.newAns3 = data.answer3;
        this.newAns4 = data.answer4;
        this.newAns5 = data.answer5;
        this.newAns6 = data.answer6;
        if (data.answer6 === '') {
            this.simpleValue = 5;
            this.showAns = [true,true,true,true,false];
        } else {
            this.simpleValue = 6;
            this.showAns = [true,true,true,true,true];
        }
        if (data.answer5 === '') {
            this.simpleValue = 4;
            this.showAns = [true,true,true,false,false];
        }
        if (data.answer4 === '') {
            this.simpleValue = 3;
            this.showAns = [true,true,false,false,false];
        }
        if (data.answer3 === '') {
            this.simpleValue = 2;
            this.showAns = [true,false,false,false,false];
        }
        this.newGood = data.good;
        this.testId = data.id;
        this.img = data.image.replace(/.*[\/|\\](.*)/g, '$1');
        this.disable = true;
        this.changeTest = true;
    }

    confirmChangeTest() {
        var tempPath;
        if (this.uploader.queue.length > 0) {
            tempPath = this.uploader.queue[0]._file.path;
            this.newImg = '../dist/assets/img/' + this.uploader.queue[0]._file.name;
        } else {
            tempPath = '';
            this.newImg = null;
        }
        if (this.newImg === null) {
            tempPath = '';
            this.newImg = '../dist/assets/img/test-img.jpg';
        }


        switch (parseFloat(this.simpleValue)) {
            case 2:
                this.newAns3 = '';
                this.newAns4 = '';
                this.newAns5 = '';
                this.newAns6 = '';
                break;
            case 3:
                this.newAns4 = '';
                this.newAns5 = '';
                this.newAns6 = '';
                break;
            case 4:
                this.newAns5 = '';
                this.newAns6 = '';
                break;
            case 5:
                this.newAns6 = '';
                break;
            case 6:
                break;
        }
        this.testingService.updateTest(this.testId, this.newQuestion, this.newAns1, this.newAns2, this.newAns3,
            this.newAns4, this.newAns5, this.newAns6, this.newGood, this.newImg, tempPath);
        this.tests = this.testingService.getAllTest();
        this.sortArray();
        this.newTest = this.tests;
        this.changeTest = false;
        this.disable = false;
        alert('Інформація про питання оновлена!!!');
    }

    addQuestion() {
        if (this.saveThemeForAdd === null) {
            alert('Виберіть тему');
        } else {
            this.showAns = [true,true,true,false,false];
            this.simpleValue = 4;
            var temp = this.testingService.getThemeById(this.saveThemeForAdd);
            this.Theme = temp[0].theme;
            this.newQuestion = '';
            this.newAns1 = '';
            this.newAns2 = '';
            this.newAns3 = '';
            this.newAns4 = '';
            this.newAns5 = '';
            this.newAns6 = '';
            this.newGood = 1;
            this.changeAddTest = true;
            this.disable = true;
        }
    }

    confirmAddTest() {
        var tempPath;
        if (this.uploader.queue.length > 0) {
            tempPath = this.uploader.queue[0]._file.path;
            this.newImg = '../dist/assets/img/' + this.uploader.queue[0]._file.name;
        } else {
            tempPath = '';
            this.newImg = null;
        }
        if (this.newImg === null) {
            tempPath = '';
            this.newImg = '../dist/assets/img/test-img.jpg';
        }
        this.testingService.addQuestion(this.saveThemeForAdd, this.newQuestion, this.newAns1,
            this.newAns2, this.newAns3, this.newAns4, this.newAns5, this.newAns6, this.newGood, this.newImg, tempPath);
        this.tests = this.testingService.getAllTest();
        this.sortArray();
        this.sortTheme(this.saveThemeForAdd);
        this.changeAddTest = false;
        this.disable = false;
        this.uploader.clearQueue();
        alert('Питання було створено!!!');
    }

    cancelAddTest() {
        this.changeAddTest = false;
        this.changeAddTheme = false;
        this.changeTest = false;
        this.disable = false;
    }

    addTheme() {
        this.disable = true;
        this.changeAddTheme = true;
    }

    removeTheme() {
        if (this.saveThemeForAdd === null) {
            alert('Виберіть тему для видалення!!!');
        } else {
            this.testingService.destroyTheme(this.saveThemeForAdd);
            this.testingService.destroyQuestions(this.saveThemeForAdd);
            this.themeArray = this.testingService.getAllTheme();
            this.tests = this.testingService.getAllTest();
            this.sortArray();
            this.newTest = this.tests;
            this.changeTest = false;
            alert('Тема та всі її питання були видалені!!!')
        }
    }

    removeQuestion() {
        this.testingService.destroyQuestion(this.testId);
        this.themeArray = this.testingService.getAllTheme();
        this.tests = this.testingService.getAllTest();
        this.sortArray();
        this.newTest = this.tests;
        this.changeTest = false;
        this.disable = false;
        alert('Питання було видалено!!!')
    }

    confirmAddTheme() {
        this.testingService.createTheme(this.newTheme);
        this.themeArray = this.testingService.getAllTheme();
        this.changeAddTheme = false;
        this.disable = false;
        alert('Тема була створена!!!');
    }

    sortArray() {
        this.tests.sort(function(obj1, obj2) {
            return obj1.theme - obj2.theme;
        });
    };

    changeCountAnswer(count) {
        this.simpleValue = parseFloat(count);
        switch (parseFloat(count)) {
           case 2:
               this.showAns = [true,false,false,false,false];
               break;
           case 3:
               this.showAns = [true,true,false,false,false];
               break;
           case 4:
               this.showAns = [true,true,true,false,false];
               break;
           case 5:
               this.showAns = [true,true,true,true,false];
               break;
           case 6:
               this.showAns = [true,true,true,true,true];
               break;
        }
    }

    changeSimpleGood(good) {
        this.newGood = parseFloat(good);
    }

    hideGlobalMenu() {
        if (this.uploader.queue.length > 0) {
            this.newImg = '../dist/assets/img/' + this.uploader.queue[0]._file.name;
        } else {
            this.newImg = null;
        }
        if (this.newImg === null) {
            this.newImg = '../dist/assets/img/test-img.jpg';
        }
        this.question = {
            theme: this.Theme,
            question: this.newQuestion,
            answer1: this.newAns1,
            answer2: this.newAns2,
            answer3: this.newAns3,
            answer4: this.newAns4,
            answer5: this.newAns5,
            answer6: this.newAns6,
            image: this.newImg
        };
        this.loginService.hideMenu(true);
        this.showDemo = true;
    }

    showGlobalMenu() {
        this.loginService.hideMenu(false);
        this.showDemo = false;
    }

    validQuest() {
        if (this.newQuestion !== '') {
            return true
        } else {
            return false
        }
    }

    validAns1() {
        if (this.newAns1 !== '') {
            return true
        } else {
            return false
        }
    }

    validAns2() {
        if (this.newAns2 !== '') {
            return true
        } else {
            return false
        }
    }

    validAns3() {
        if (this.showAns[1]) {
            if (this.newAns3 !== '') {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    validAns4() {
        if (this.showAns[2]) {
            if (this.newAns4 !== '') {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    validAns5() {
        if (this.showAns[3]) {
            if (this.newAns5 !== '') {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    validAns6() {
        if (this.showAns[4]) {
            if (this.newAns6 !== '') {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    ngOnInit() {
        remote.getCurrentWindow().maximize();
        this.loginService.setTitle('Питання для тестування');
        this.themeArray = this.testingService.getAllTheme();
        this.tests = this.testingService.getAllTest();
        this.tests.sort(function(obj1, obj2) {
            return obj1.theme - obj2.theme;
        });
        this.newTest = this.tests;
    }
}
