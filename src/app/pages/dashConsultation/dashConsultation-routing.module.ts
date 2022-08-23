import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashConsultationPage } from './dashConsultation.page';
import * as path from "path";
import {LaboratoirePage} from "./laboratoire/laboratoire.page";

const routes: Routes = [
  {
    path: '',
    component: DashConsultationPage,
    children:[
      {
        path: 'laboratoire',
        loadChildren: () => import('./laboratoire/laboratoire.module').then( m => m.LaboratoirePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashConsultationPageRoutingModule {}
