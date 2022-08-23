import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashVitauxPageRoutingModule } from './dashVitaux-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';


import { DashVitauxPage } from './dashVitaux.page';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../material.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashVitauxPageRoutingModule,
    MatTableModule,
    MatButtonModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  declarations: [DashVitauxPage, DialogBoxComponent]
})
export class DashVitauxPageModule {}
