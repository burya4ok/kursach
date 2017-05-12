import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherComponent} from "./teacher.component";
import {TeacherTestingComponent} from "./testing/testing.component";
import {TeacherMaterialsComponent} from "./materials/materials.component";
import {CurriculumTeacherComponent} from "./curriculum/curriculum.component";
import {TrainingUnitComponent} from "./trainingUnit/trainingUnit.component";
import {TeacherAdditionalMaterialsComponent} from "./additionalMaterials/additional-materials.component";

const routes: Routes = [

    {
        path: 'testing',
        component: TeacherTestingComponent
    },
    {
        path: 'materials',
        component: TeacherMaterialsComponent
    },
    {
        path: 'additional-materials',
        component: TeacherAdditionalMaterialsComponent
    },
    {
        path: 'curriculum',
        component: CurriculumTeacherComponent
    },
    {
        path: 'unit',
        component: TrainingUnitComponent
    },
    {
        path: '',
        redirectTo: '/curriculum',
        pathMatch: 'full'
    },
    {
        path: '*path',
        redirectTo: '/curriculum',
        pathMatch: 'full'
    },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
