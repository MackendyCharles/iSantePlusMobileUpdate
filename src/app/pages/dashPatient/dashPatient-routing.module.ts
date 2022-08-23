import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashPatientPage } from './dashPatient.page';

const routes: Routes = [
  {
    path: '',
    component: DashPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashPatientPageRoutingModule {}
