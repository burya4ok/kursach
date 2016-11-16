import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class SubjectService {

    setSubject = (data): void => {
        ipcRenderer.sendSync('setSubject', data);
    };

    getSubject = (): any => {
        return ipcRenderer.sendSync('getSubject');
    }
}