import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AllergiesPageRoutingModule } from './allergies-routing.module';
import { AllergiesPage } from './allergies.page';
import { NgxPaginationModule } from 'ngx-pagination';
import {MaterialModule} from "../../material.module";
import {DialogAllergyComponent} from "../../components/dialog-allergy/dialog-allergy.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllergiesPageRoutingModule,
    NgxPaginationModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    IonicModule,
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
  declarations: [AllergiesPage, DialogAllergyComponent]
})
export class AllergiesPageModule {}
