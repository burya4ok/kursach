import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {remote} from "electron";
import {TestingService} from "../../services/testing.service";
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {LoginService} from "../../services/login.service";


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
    Theme: string;
    newGood: string;
    newTheme: string;
    testId: number;
    saveThemeForAdd: string;
    newImg: any;
    checkBoxForImg: boolean;
    allTheme: any[];
    public uploader: FileUploader = new FileUploader({isHTML5: true});
    disable: boolean;

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
        this.testingService.updateTest(this.testId, this.newQuestion, this.newAns1, this.newAns2, this.newAns3,
            this.newAns4, this.newGood, this.newImg, tempPath);
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
            var temp = this.testingService.getThemeById(this.saveThemeForAdd);
            this.Theme = temp[0].theme;
            this.newQuestion = '';
            this.newAns1 = '';
            this.newAns2 = '';
            this.newAns3 = '';
            this.newAns4 = '';
            this.newGood = null;
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
            this.newAns2, this.newAns3, this.newAns4, this.newGood, this.newImg, tempPath);
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

    ngOnInit() {
        remote.getCurrentWindow().maximize();
        this.loginService.setTitle('Питання для тестування');
        this.themeArray = this.testingService.getAllTheme();
        this.tests = this.testingService.getAllTest();
        this.tests.sort(function(obj1, obj2) {
            return obj1.theme - obj2.theme;
        });
        /*this.activeChangeTest(this.tests[0]);
        var tmp = document.getElementsByName('list-questions');
        console.log(tmp);
        this.renderer.setElementAttribute(tmp[0], "selected", "true");*/
        this.newTest = this.tests;
    }
}
