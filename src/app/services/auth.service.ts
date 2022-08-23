
import { User } from './../models/user';
import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ControlContainer } from '@angular/forms';
import { AppConstant } from '../common/app-constant';
import { Storage } from '@ionic/storage-angular';
import { async } from 'rxjs';
import { TokenStorageService } from './tokenStorage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
   user: User = new User();
  headerOptions: any = '';
  constructor(private httpClient: HttpClient,
    public storage: Storage,
    private token: TokenStorageService,
    private router: Router,
    private toastCtrl: ToastController) {
    this.storage.create();
  }

  signin(userName: string, passWord: string): any {
    this.headerOptions = {
      headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
       Authorization: 'Basic ' + btoa(userName + ':' + passWord),
      }),
    };

    //alert(AppConstant.API_BASE_URL + '/user/login?username=' + userName + '&password='+ passWord)

   // console.log(AppConstant.API_BASE_URL + '/user/login?username=' + userName + '&password='+ passWord, this.headerOptions);
    const params = {};
    this.httpClient
      .get(AppConstant.API_BASE_URL + '/user/login?username=' + userName + '&password='+ passWord, this.headerOptions)
      .subscribe(( res: any) => {


      //  const result1=JSON.parse(res);
       console.log(res);

        console.log();
        
       if(res){
        //const result=JSON.parse(res);
        //console.log(result.results[0].uuid);
        console.log(res.provider[0].uuid);

         this.user.userName=res.display;
         //this.user.passWord=passWord;
         this.user.uuid=res.uuid;
         this.user.provider= res.provider[0].uuid;
         this.token.saveUser(this.user);


         console.log(this.token.getUser());

         this.router.navigate(['home/dashboad']);

       }else{

        this.router.navigate(['login']);
         this.showToast(res.provider[0].uuid);
       }
      },
      (err) => {
          this.showToast(err.string);
          this.router.navigate(['login']);
      });
  }

  async showToast(messa: string){
    await this.toastCtrl.create({
      message: "Utilisateur ou Mot de Passe Incorrect: "  + messa,
      duration: 4000,
    }).then(res => res.present());
  }

}
