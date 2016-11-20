import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import * as path from 'path';
import {LoginService} from "../../services/login.service";
import {MaterialsService} from "../../services/materials.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-materials',
  templateUrl: 'materials.component.html',
  styleUrls: ['materials.component.css'],

})
export class StudentMaterialsComponent implements OnInit {
  win: Electron.BrowserWindow;
  materials: any[];
  currentMaterial: any;
  type: string;
  title: any = '';
  filesNotFound: boolean;
  sub: any;
  constructor(private loginService: LoginService, private materialsService: MaterialsService, private route: ActivatedRoute) {

  }

  setLecture(lecture: any) {
    this.currentMaterial = lecture;
    this.currentMaterial.viewerPath = path.normalize(path.join('./pdfjs/viewer.html?file=' + lecture.file));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.materialsService.getTypes().map((item: any) => {
        if (item.value === this.type) {
          this.loginService.setTitle(item.title);
        }
      });
      this.materials = this.materialsService.getMaterialsByType(this.type);
      if (this.materials.length > 0) {
        this.setLecture(this.materials[0]);
        this.filesNotFound = false;
      } else {
        this.filesNotFound = true;
      }
    });
  }
}
