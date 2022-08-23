import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VitauxPage } from './vitaux.page';

const routes: Routes = [
  {
    path: '',
    component: VitauxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VitauxPageRoutingModule {}
