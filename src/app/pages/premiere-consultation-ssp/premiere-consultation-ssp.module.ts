import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiereConsultationSSPPageRoutingModule } from './premiere-consultation-ssp-routing.module';

import { PremiereConsultationSSPPage } from './premiere-consultation-ssp.page';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MaterialModule} from "../../material.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MaterialModule,
    MatDividerModule,
    MatGridListModule,
    PremiereConsultationSSPPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [PremiereConsultationSSPPage]
})
export class PremiereConsultationSSPPageModule {}
