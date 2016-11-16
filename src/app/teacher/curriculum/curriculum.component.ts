import {Component, OnInit} from '@angular/core';
import {remote} from 'electron';
import {CurriculumService} from "../../services/curriculum.service";
import {LoginService} from "../../services/login.service";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-curriculum',
  templateUrl: 'curriculum.component.html',
  styleUrls: ['curriculum.component.css']

})
export class CurriculumTeacherComponent implements OnInit {
  win: Electron.BrowserWindow;
  curriculum: any;
  editCurriculum: any;

  constructor(private curriculumService: CurriculumService, private loginService: LoginService, private toastr: ToastsManager) {
    this.refreshData();
  }

  saveChanges = (): void => {
    let result = this.curriculumService.setCurriculum(this.editCurriculum);
    if (result) {
      this.showSuccess();
    }
    this.refreshData();
  };

  cancelChanges = (): void => {
    this.editCurriculum = this.curriculumService.getCurriculum();
  };

  isSame = (): boolean => {
    return JSON.stringify(this.editCurriculum) === JSON.stringify(this.curriculum);
  };

  private refreshData() {
    this.editCurriculum = this.curriculumService.getCurriculum();
    this.curriculum = this.curriculumService.getCurriculum();
  }

  private showSuccess() {
    this.toastr.success('Навчальний план збережено', 'Успіх!');
  }

  ngOnInit() {
    this.loginService.setTitle('Навчальний план');
  }
}
