import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class TestingService {

    getAllTest(){
        return ipcRenderer.sendSync('getAllTest');
    }
}