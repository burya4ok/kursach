import {Component, OnInit} from '@angular/core';
import {CurriculumService} from "../../services/curriculum.service";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-curriculum',
  templateUrl: 'curriculum.component.html',
  styleUrls: ['curriculum.component.css']

})
export class CurriculumStudentComponent implements OnInit {
  win: Electron.BrowserWindow;
  curriculum: any;

  constructor(private curriculumService: CurriculumService, private loginService: LoginService) {
    this.curriculum = curriculumService.getCurriculum();

  }

  ngOnInit() {
    this.loginService.setTitle('Навчальний план');
  }
}
