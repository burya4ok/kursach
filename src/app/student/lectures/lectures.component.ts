import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import * as path from 'path';
import {LoginService} from "../../services/login.service";
import {MaterialsService} from "../../services/materials.service";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css'],

})
export class StudentLecturesComponent implements OnInit {
  win: Electron.BrowserWindow;
  lectures: any[];
  currentLecture: any;
  constructor(private loginService: LoginService, private materialsService: MaterialsService) {
    this.lectures = materialsService.getMaterialsByType('lectures');
    this.setLecture(this.lectures[0]);
  }

  setLecture(lecture: any) {
    this.currentLecture = lecture;
    this.currentLecture.viewerPath = path.normalize(path.join('./pdfjs/viewer.html?file=' + lecture.file));
  }

  ngOnInit() {
    this.loginService.setTitle('Лекції');
  }
}
