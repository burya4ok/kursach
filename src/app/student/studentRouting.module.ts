import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TestingComponent} from "./testing/testing.component";
import {TestingPageComponent} from "./testingPage/testingPage.component";
import {StudentMaterialsComponent} from "./materials/materials.component";
import {CurriculumStudentComponent} from "./curriculum/curriculum.component";

const routes: Routes = [

    {
        path: 'testing',
        component: TestingComponent
    },
    {
        path: 'testingPage',
        component: TestingPageComponent
    },
    {
        path: 'materials/:type',
        component: StudentMaterialsComponent
    },
    {
        path: 'curriculum',
        component: CurriculumStudentComponent
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

export const studentRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
