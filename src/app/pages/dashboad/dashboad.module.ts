import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboadPageRoutingModule } from './dashboad-routing.module';

import { DashboadPage } from './dashboad.page';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboadPageRoutingModule,
    MatGridListModule
  ],
  declarations: [DashboadPage]
})
export class DashboadPageModule {}
