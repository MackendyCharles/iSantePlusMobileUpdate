import { Component, OnInit } from '@angular/core';
import { Settings } from './models/settings';
import { ApiService } from './services/api.service';
import { AppConstant } from 'src/app/common/app-constant';
import { DbSettingService } from './services/db-setting.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent implements OnInit {

  api_base: any;
  location_uuid : any;

  Data: any[] = []
  
  constructor( private api: ApiService, private dbSetting: DbSettingService, private toast: ToastController,) {

      // this.api.getSettings()
      //   .subscribe({
      //     next: (res) => {
      //       //alert("Save successfully")
      //       const resultGetSettings = res;
      //       console.log(resultGetSettings);

      //       this.api_base =  resultGetSettings[0].protocol + "://" + resultGetSettings[0].ipAddress + ":" + resultGetSettings[0].port + "/" + resultGetSettings[0].api //  "http://192.168.1.239:8081/openmrs";
      //       this.location_uuid = resultGetSettings[0].location;

      //       sessionStorage.setItem("KEY_API", this.api_base);
      //       sessionStorage.setItem("KEY_LOCATION", this.location_uuid);

      //       AppConstant.API_BASE_URL = this.api_base;
      //       AppConstant.LOCAION_UUID = this.location_uuid;
            

      //       console.log( "mac:::", this.api_base);
          
      //       },

      //     error: (err) => {
      //       alert("Error save")
      //     }
      //   })

     this.dbSetting.dbState().subscribe((res) => {
        if(res){
          this.dbSetting.fetchSetting().subscribe( item => {
            
            for (var i = 0; i < item.length; i++) { 

              this.api_base =  item[i].protocol + "://" + item[i].ipaddress + ":" + item[i].port + "/" + item[i].api //  "http://192.168.1.239:8081/openmrs";
              this.location_uuid = item[i].locations;
              sessionStorage.setItem("KEY_API", this.api_base);
              sessionStorage.setItem("KEY_LOCATION", this.location_uuid);
        
              AppConstant.API_BASE_URL = this.api_base;
              AppConstant.LOCAION_UUID = this.location_uuid;
             
            }
           
          })
        }
      });
    }

    ngOnInit() {

     
      
    }
    
    // fetch("./assets/inputFile/settings.json")
    // .then((resSta) => resSta.json())
    // .then((jsonSta) => {
    // var settings2 = jsonSta;       
    
    // this.api_base =  settings2.protocol + "://" + settings2.ipAddress + ":" + settings2.port + "/" + settings2.api //  "http://192.168.1.239:8081/openmrs";
    // this.location_uuid = settings2.location;

    // console.log( "mac:::", this.api_base);

    // sessionStorage.setItem("KEY_API", this.api_base);
    // sessionStorage.setItem("KEY_LOCATION", this.location_uuid);
    
    // });
  }

   

