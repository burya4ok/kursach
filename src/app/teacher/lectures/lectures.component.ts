import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {remote, ipcRenderer} from 'electron';
import {LoginService} from "../../services/login.service";
import {LecturesService} from "../../services/lectures.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    selector: 'app-lectures',
    templateUrl: './lectures.component.html',
    styleUrls: ['./lectures.component.css'],

})
export class TeacherLecturesComponent implements OnInit {
    win: Electron.BrowserWindow;
    lectures: any;
    file: any;
    public uploader: FileUploader = new FileUploader({isHTML5: true});
    public hasBaseDropZoneOver: boolean = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    constructor(private loginService: LoginService, private lecturesService: LecturesService, public toastr: ToastsManager) {
        this.lectures = this.lecturesService.getFullLecturesInfo();
        this.uploader.addToQueue(this.lectures);
        this.uploader.queue.forEach((item: any, index: number) => {
            if (item._file.path === this.lectures[index].path) {
                item.index = index;
                item.isSuccess = true;
                item.isUploaded = true;
                item.progress = 100;
            }
        });

        this.uploader.uploadItem = (item: any) => {
            let index = this.uploader.queue.indexOf(item);
            let isAdded = this.lecturesService.addLecture(
                {
                    path: item._file.path,
                    name: item._file.path.replace(/.*[\/|\\](.*)\..*/g, '$1')
                });
            if (isAdded) {
                this.uploader.queue[index].isReady = false;
                this.uploader.queue[index].isUploading = false;
                this.uploader.queue[index].isSuccess = true;
                this.uploader.queue[index].isUploaded = true;
                this.uploader.queue[index].progress = 100;
                this.showSuccess()
            } else {
                this.uploader.queue[index].isError = true;
                this.uploader.removeFromQueue(this.uploader.queue[index]);
                this.showError()
            }
        };
    }

    removeLecture = (item: any) => {
        this.uploader.removeFromQueue(item);
        this.lecturesService.removeLecture(item._file.id);
    };

    private showSuccess() {
        this.toastr.success('Файл доданий до списку', 'Успіх!');
    }

    private showError() {
        this.toastr.error('Невірний формат файлу або файл вже існує', 'Помилка!');
    }

    ngOnInit() {
        this.loginService.setTitle('Лекції');
    }
}
