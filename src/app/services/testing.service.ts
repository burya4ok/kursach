import {Injectable} from '@angular/core';
import {ipcRenderer} from 'electron';

@Injectable()
export class TestingService {
    learn: boolean;
    modTest: boolean;
    allTheme: boolean;
    oneTheme: boolean;
    testName: string;

    saveAll(saveLearn: boolean, saveModTest: boolean, saveAllTheme: boolean, saveOneTheme: boolean, saveTestName: string) {
        this.learn = saveLearn;
        this.modTest = saveModTest;
        this.allTheme = saveAllTheme;
        this.oneTheme = saveOneTheme;
        this.testName = saveTestName;
    }

    getAllTest() {
        return ipcRenderer.sendSync('getAllTest');
    }

    getTest() {
        var id = this.getThemeByName(this.testName);
        return ipcRenderer.sendSync('getTest', {testTheme: id[0].id});
    }

    updateTest(tempId, tempQuestion, tempAns1, tempAns2, tempAns3, tempAns4, tempGood, tempImg, tempPath) {
        return ipcRenderer.sendSync('updateTest', {
            testId: tempId, testQuestion: tempQuestion, testAns1: tempAns1,
            testAns2: tempAns2, testAns3: tempAns3, testAns4: tempAns4, testGood: tempGood, testImg: tempImg, testPath: tempPath
        });
    }

    addQuestion(tempTheme, tempQuestion, tempAns1, tempAns2, tempAns3, tempAns4, tempGood, tempImg, tempPath) {
        return ipcRenderer.sendSync('addQuestion', {
            testTheme: tempTheme, testQuestion: tempQuestion, testAns1: tempAns1,
            testAns2: tempAns2, testAns3: tempAns3, testAns4: tempAns4, testGood: tempGood, testImg: tempImg, testPath: tempPath
        });
    }

    destroyQuestions(testId) {
        return ipcRenderer.sendSync('destroyQuestions', {tempId: testId});
    }
    destroyQuestion(testId) {
        return ipcRenderer.sendSync('destroyQuestion', {tempId: testId});
    }

    getAllTheme() {
        return ipcRenderer.sendSync('getAllTheme');
    }

    getThemeByName(testTheme) {
        return ipcRenderer.sendSync('getThemeByName', {tempTheme: testTheme});
    }

    destroyTheme(testId) {
        return ipcRenderer.sendSync('destroyTheme', {tempId: testId});
    }

    createTheme(testTheme) {
        return ipcRenderer.sendSync('createTheme', {tempTheme: testTheme});
    }

    getThemeById(testId) {
        return ipcRenderer.sendSync('getThemeById', {tempId: testId});
    }

}