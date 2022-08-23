import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import { IonicModule } from '@ionic/angular';
import {MatTableModule} from '@angular/material/table';

import { DashPatientPageRoutingModule } from './dashPatient-routing.module';

import { DashPatientPage } from './dashPatient.page';
import { MatIconModule } from '@angular/material/icon';


import { MaterialModule } from '../../material.module';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatTableModule,
    DashPatientPageRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MaterialModule,
    MatDividerModule,
    MatGridListModule


  ],
  declarations: [DashPatientPage]
})
export class DashPatientPageModule {}
