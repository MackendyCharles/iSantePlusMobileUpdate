import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashVitauxPage } from './dashVitaux.page';

const routes: Routes = [
  {
    path: '',
    component: DashVitauxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashVitauxPageRoutingModule {}
