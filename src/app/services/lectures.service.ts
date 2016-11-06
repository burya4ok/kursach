import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class LecturesService {
    getFullLecturesInfo(): any[]{
        return ipcRenderer.sendSync('getFullLecturesInfo');
    }
    getPartLecturesInfo(): any[]{
        return ipcRenderer.sendSync('getPartLecturesInfo');
    }
    addLectures(lectures: any): boolean{
        return ipcRenderer.sendSync('addLectures', {lectures: lectures});
    }
    addLecture(lecture: any): boolean{
        return ipcRenderer.sendSync('addLecture', {lecture: lecture});
    }
    removeLecture(id: number): boolean{
        return ipcRenderer.sendSync('removeLecture', {id: id});
    }

}