import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';
import  {ConduiteTenirComponent} from "./conduite-tenir/conduite-tenir.component";
import  {ResultatTraitementTBComponent} from "./resultat-traitement-tb/resultat-traitement-tb.component";
import {SurveillanceTraitementTBComponent} from "./surveillance-traitement-tb/surveillance-traitement-tb.component";
import {AutrePlanComponent} from "./autre-plan/autre-plan.component";
import { IonicModule, IonicSlides } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [SlidesComponent, StartComponent, LogoComponent, AutrePlanComponent, ConduiteTenirComponent, ResultatTraitementTBComponent, SurveillanceTraitementTBComponent],
  exports: [SlidesComponent, StartComponent, LogoComponent, AutrePlanComponent, ConduiteTenirComponent, ResultatTraitementTBComponent, SurveillanceTraitementTBComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MaterialModule

  ]
})
export class ComponentsModule { }
