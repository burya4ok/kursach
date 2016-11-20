import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload/components/file-upload/file-upload.module';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { DevExtremeModule } from 'devextreme-angular2';
import { SimpleTimer } from 'ng2-simple-timer';


import {routing, appRoutingProviders}  from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentComponent} from './student/student.component';
import {TestingComponent} from './student/testing/testing.component';
import {TeacherTestingComponent} from './teacher/testing/testing.component';
import {TestingPageComponent} from './student/testingPage/testingPage.component';
import {StudentMaterialsComponent, SafePipe} from './student/materials/materials.component';
import {TeacherMaterialsComponent} from './teacher/materials/materials.component';
import {LoginService} from "./services/login.service";
import {TestingService} from "./services/testing.service";
import { MaterialsService} from "./services/materials.service";
import {CurriculumService} from "./services/curriculum.service";
import {CurriculumStudentComponent} from "./student/curriculum/curriculum.component";
import {CurriculumTeacherComponent} from "./teacher/curriculum/curriculum.component";
import {TrainingUnitComponent} from "./teacher/trainingUnit/trainingUnit.component";
import {TrainingUnitService} from "./services/trainingUnit.service";
import {SubjectService} from "./services/subject.service";
import {CustomIconsService} from "./services/customIcons.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TeacherComponent,
        StudentComponent,
        TestingComponent,
        TeacherTestingComponent,
        TestingPageComponent,
        StudentMaterialsComponent,
        TeacherMaterialsComponent,
        SafePipe,
        CurriculumStudentComponent,
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
        DevExtremeModule
    ],
    providers: [appRoutingProviders, LoginService, TestingService, MaterialsService, CurriculumService,
                TrainingUnitService, SubjectService, CustomIconsService, SimpleTimer],
    bootstrap: [AppComponent]
})
export class AppModule {
}
