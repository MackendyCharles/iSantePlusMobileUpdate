import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdonnancePageRoutingModule } from './ordonnance-routing.module';

import { OrdonnancePage } from './ordonnance.page';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../../material.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {DialogOrdonnanceComponent} from "../../../components/dialog-ordonnance/dialog-ordonnance.component";

@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    OrdonnancePageRoutingModule ,
    MatIconModule ,
    ReactiveFormsModule ,
    MatFormFieldModule ,
    MatDatepickerModule,
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
  declarations: [OrdonnancePage, DialogOrdonnanceComponent]
})
export class OrdonnancePageModule {}
