import { TokenStorageService } from './../../services/tokenStorage.service';
/* eslint-disable @typescript-eslint/naming-convention */

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SettingsComponent } from '../../components/settings/settings.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: '';
  password: '';

  hide = true;

  constructor(private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    public storage: Storage,
    private token: TokenStorageService,
    private permissions: AndroidPermissions) {
    this.storage.create();
  }

  ngOnInit() {

   // let url: settings = new Settings();
  }

  login() {
 
    this.authService.signin(this.username, this.password);

    this.token.getUser();
 
  }


  openDialog() {
    this.dialog.open(SettingsComponent, {
      width: '60%',
      disableClose: true,
      closeOnNavigation: false,
     // data: this.patientInfo

    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       // this.getAllVitaux();
      }
    })
  }
}
