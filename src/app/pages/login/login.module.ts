import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';
import {IonicStorageModule} from '@ionic/storage-angular';
import {MatButtonModule} from '@angular/material/button';
import {Logo2Component} from "../../components/logo2/logo2.component";
import {MaterialModule} from "../../material.module";
import { SettingsComponent } from 'src/app/components/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicStorageModule,
    LoginPageRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [LoginPage, Logo2Component, SettingsComponent]
})
export class LoginPageModule {}
