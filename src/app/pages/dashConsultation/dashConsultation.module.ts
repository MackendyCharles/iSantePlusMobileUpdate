import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DashConsultationPageRoutingModule} from './dashConsultation-routing.module';
import {DashConsultationPage} from './dashConsultation.page';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MaterialModule} from "../../material.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
    imports: [
        CommonModule ,
        FormsModule ,
        IonicModule ,
        MatInputModule ,
        MatTableModule ,
        MatExpansionModule ,
        MatIconModule ,
        MaterialModule ,
        MatDividerModule ,
        MatGridListModule ,
        DashConsultationPageRoutingModule ,
    ] ,
    declarations: [DashConsultationPage]
})
export class DashConsultationPageModule {
}
