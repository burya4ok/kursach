import {Component, OnInit} from '@angular/core';
import {CurriculumService} from "../../services/curriculum.service";
import {LoginService} from "../../services/login.service";
import {ToastsManager} from "ng2-toastr";
import {SubjectService} from "../../services/subject.service";

@Component({
  selector: 'app-curriculum',
  templateUrl: 'curriculum.component.html',
  styleUrls: ['curriculum.component.css']

})
export class CurriculumTeacherComponent implements OnInit {
  win: Electron.BrowserWindow;
  curriculum: any;
  editCurriculum: any;
  subject: any;
  editSubject: any;

  constructor(private curriculumService: CurriculumService, private loginService: LoginService,
              private subjectService: SubjectService, private toastr: ToastsManager) {
    this.refreshCurriculumData();
    this.refreshSubjectData();
  }

  private refreshSubjectData() {
    this.editSubject = this.subjectService.getSubject();
    this.subject = this.subjectService.getSubject();
  }

  saveSubject = (): void => {
    let result = this.subjectService.setSubject(this.editSubject);
    if (result) {
      this.showSuccess();
    }
    this.refreshSubjectData()
  };

  cancelSubject = (): void => {
    this.editSubject = this.subjectService.getSubject();
  };

  isSameSubject = (): boolean => {
    return JSON.stringify(this.editSubject) === JSON.stringify(this.subject);
  };

  onUploadError = (e) => {
    this.editSubject.path = e.file.path;
    this.editSubject.mainImg = e.file.name;
  };


  private refreshCurriculumData() {
    this.editCurriculum = this.curriculumService.getCurriculum();
    this.curriculum = this.curriculumService.getCurriculum();
  }

  saveCurriculum = (): void => {
    let result = this.curriculumService.setCurriculum(this.editCurriculum);
    if (result) {
      this.showSuccess();
    }
    this.refreshCurriculumData();
  };

  cancelCurriculum = (): void => {
    this.editCurriculum = this.curriculumService.getCurriculum();
  };

  isSameCurriculum = (): boolean => {
    return JSON.stringify(this.editCurriculum) === JSON.stringify(this.curriculum);
  };


  private showSuccess() {
    this.toastr.success('Зміни збережено', 'Успіх!');
  }

  ngOnInit() {
    this.loginService.setTitle('Навчальний план');
  }
}
