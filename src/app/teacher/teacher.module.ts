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


import {routing, appRoutingProviders}  from './teacherRouting.module';
import {TeacherComponent} from './teacher.component';
import {TeacherTestingComponent} from './testing/testing.component';
import {TeacherMaterialsComponent} from './materials/materials.component';
import {TestingService} from "../services/testing.service";
import {MaterialsService} from "../services/materials.service";
import {CurriculumService} from "../services/curriculum.service";
import {CurriculumTeacherComponent} from "./curriculum/curriculum.component";
import {TrainingUnitComponent} from "./trainingUnit/trainingUnit.component";
import {TrainingUnitService} from "../services/trainingUnit.service";
import {SubjectService} from "../services/subject.service";
import {CustomIconsService} from "../services/customIcons.service";
import {LoginService} from "../services/login.service";
import {TeacherAdditionalMaterialsComponent} from "./additionalMaterials/additional-materials.component";
import {AdditionalMaterialsService} from "../services/additional-materials.service";

@NgModule({
    declarations: [
        TeacherComponent,
        TeacherTestingComponent,
        TeacherMaterialsComponent,
        TeacherAdditionalMaterialsComponent,
        CurriculumTeacherComponent,
        TrainingUnitComponent
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
    providers: [appRoutingProviders, LoginService, TestingService, MaterialsService, CurriculumService,
        TrainingUnitService, SubjectService, CustomIconsService, SimpleTimer, AdditionalMaterialsService],
    bootstrap: [TeacherComponent]
})
export class TeacherModule {
}
