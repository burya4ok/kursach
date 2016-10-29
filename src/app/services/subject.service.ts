import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class SubjectService {
    subject: any;
    constructor(){
        this.subject = ipcRenderer.sendSync('getSubject');
    }

    reloadSubject(): void{
        this.subject = ipcRenderer.sendSync('getSubject');
    }
}