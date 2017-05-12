import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import * as path from 'path';
import {LoginService} from "../../services/login.service";
import {MaterialsService} from "../../services/materials.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {TrainingUnitService} from "../../services/trainingUnit.service";

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
  filter: any;

  constructor(private loginService: LoginService, private materialsService: MaterialsService,
              private trainingUnitService: TrainingUnitService, private route: ActivatedRoute) {
    this.filter = {
      load: () => {
        return this.trainingUnitService.getTrainingUnits(null)
      }
    }
  }

  setLecture(lecture: any) {
    this.currentMaterial = lecture;
    this.currentMaterial.viewerPath = path.normalize(path.join('./pdfjs/viewer.html?file=' + lecture.file));
  }

  filteredBy(unit: any) {
    this.initMaterials(this.type, unit.code)
  }

  private initMaterials(type: string, unit?: string) {
    this.materials = this.materialsService.getMaterialsByType(type, unit);
    if (this.materials.length > 0) {
      this.setLecture(this.materials[0]);
      this.filesNotFound = false;
    } else {
      this.filesNotFound = true;
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.materialsService.getTypes().map((item: any) => {
        if (item.value === this.type) {
          this.loginService.setTitle(item.title);
        }
      });
      this.filter.load();
      this.initMaterials(this.type)
    });
  }
}
