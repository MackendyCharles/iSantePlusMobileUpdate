import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiereConsultationSSPPage } from './premiere-consultation-ssp.page';

const routes: Routes = [
  {
    path: '',
    component: PremiereConsultationSSPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiereConsultationSSPPageRoutingModule {}
