import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload/components/file-upload/file-upload.module';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {SimpleTimer} from 'ng2-simple-timer';
import {
    DxDataGridModule,
    DxScrollViewModule,
    DxFileUploaderModule,
    DxSelectBoxModule
} from 'devextreme-angular';

import {routing, studentRoutingProviders}  from './studentRouting.module';
import {StudentComponent} from './student.component';
import {TestingComponent} from './testing/testing.component';
import {TestingPageComponent} from './testingPage/testingPage.component';
import {StudentMaterialsComponent, SafePipe} from './materials/materials.component';
import {CurriculumStudentComponent} from "./curriculum/curriculum.component";
import {TestingService} from "../services/testing.service";
import {MaterialsService} from "../services/materials.service";
import {CurriculumService} from "../services/curriculum.service";
import {TrainingUnitService} from "../services/trainingUnit.service";
import {SubjectService} from "../services/subject.service";
import {CustomIconsService} from "../services/customIcons.service";
import {LoginService} from "../services/login.service";

@NgModule({
    declarations: [
        StudentComponent,
        TestingComponent,
        TestingPageComponent,
        StudentMaterialsComponent,
        SafePipe,
        CurriculumStudentComponent,
    ],
    imports: [
        FileUploadModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MaterialModule.forRoot(),
        ToastModule,
        DxDataGridModule,
        DxScrollViewModule,
        DxFileUploaderModule,
        DxSelectBoxModule
    ],
    providers: [studentRoutingProviders, LoginService, TestingService, MaterialsService, CurriculumService,
        TrainingUnitService, SubjectService, CustomIconsService, SimpleTimer],
    bootstrap: [StudentComponent]
})
export class StudentModule {
}
