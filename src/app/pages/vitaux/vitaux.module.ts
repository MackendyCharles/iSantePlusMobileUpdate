import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VitauxPageRoutingModule } from './vitaux-routing.module';

import { VitauxPage } from './vitaux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitauxPageRoutingModule
  ],
  declarations: [VitauxPage]
})
export class VitauxPageModule {}
