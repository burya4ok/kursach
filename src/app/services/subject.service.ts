import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as path from 'path';

@Injectable()
export class SubjectService {

    setSubject = (data): void => {
        return ipcRenderer.sendSync('setSubject', data);
    };

    getSubject = (): any => {
        let subject =  ipcRenderer.sendSync('getSubject');
        subject.mainImg = path.join('./assets/img/', subject.mainImg);
        return subject;
    }
}