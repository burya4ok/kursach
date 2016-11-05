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
    return ipcRenderer.sendSync('getTest', {testTheme: this.testName});
  }

}