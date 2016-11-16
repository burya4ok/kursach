import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class CurriculumService {
    getCurriculum(): any{
        return ipcRenderer.sendSync('getCurriculum');
    }
    setCurriculum(curriculum: any): boolean{
        return ipcRenderer.sendSync('setCurriculum', curriculum);
    }


}