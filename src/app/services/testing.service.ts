import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class TestingService {

    getAllTest(): any{
        return ipcRenderer.sendSync('getAllTest');
    }
}