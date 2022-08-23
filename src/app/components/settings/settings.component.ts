import { Validators } from '@angular/forms';
import { AppComponent } from './../../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AppConstant } from 'src/app/common/app-constant';
import { DbSettingService } from 'src/app/services/db-setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  settingsForm !: FormGroup;

  id : number;
  api_base: string;
  location_uuid: any;

  Data: any[] = []



  constructor(private materialModule: MaterialModule ,
    private formBuilder: FormBuilder, private api: ApiService ,
    private dialogRef: MatDialogRef<SettingsComponent> ,private dbSetting: DbSettingService,) { }

  ngOnInit() {

    this.settingsForm = this.formBuilder.group({
      locations: ['', Validators.required] ,
      ipaddress: ['', Validators.required] ,
      port: ['', Validators.required] ,
      protocol: ['', Validators.required],
      api: ['', Validators.required]
    });

    this.dbSetting.dbState().subscribe((res) => {
      
      if(res){
        this.dbSetting.fetchSetting().subscribe( (item) => {
          if (item.length > 0) {
            for (var i = 0; i < item.length; i++) { 
              this.settingsForm.controls['locations'].setValue(item[i].locations)
              this.settingsForm.controls['ipaddress'].setValue(item[i].ipaddress)
              this.settingsForm.controls['port'].setValue(item[i].port)
              this.settingsForm.controls['protocol'].setValue(item[i].protocol)
              this.settingsForm.controls['api'].setValue(item[i].api)
              this.id = item[i].id;
             
            }
          }          

                 
         
        })
      }
    });

   

    // this.api.getSettings()
    // .subscribe({
    //   next: (res) => {
    //     //alert("Save successfully")
    //     const resultGetSettings = res;
    //     console.log(resultGetSettings);

    //     this.settingsForm.controls['location'].setValue(resultGetSettings[0].location)
    //     this.settingsForm.controls['ipAddress'].setValue(resultGetSettings[0].ipAddress)
    //     this.settingsForm.controls['port'].setValue(resultGetSettings[0].port)
    //     this.settingsForm.controls['protocol'].setValue(resultGetSettings[0].protocol)
    //     this.settingsForm.controls['api'].setValue(resultGetSettings[0].api)

    //     this.id = resultGetSettings[0].id;
        
      
    //     },

    //   error: (err) => {
    //     alert("Error save")
    //   }
    // })
    
    
  }

  addSettings(){

    console.log(this.settingsForm.value);



    if(this.settingsForm.valid){

      this.dbSetting.updateSetting(this.id, this.settingsForm.value)
    .then( (res) => {
      console.log(res)
      //alert(res)
     // alert("mac12")
    })






      // this.api.putSettings(this.settingsForm.value, this.id)
      //     .subscribe({
      //       next:(res)=> {
              
      //         console.log(res);
              
      //         const resultGetSettings = res;
      //         alert("Product added successfully");
      //         this.settingsForm.reset();
      //         this.dialogRef.close('save');


      //         this.api_base =  resultGetSettings.protocol + "://" + resultGetSettings.ipAddress + ":" + resultGetSettings.port + "/" + resultGetSettings.api //  "http://192.168.1.239:8081/openmrs";
      //       this.location_uuid = resultGetSettings.location;

           

      //       sessionStorage.setItem("KEY_API", this.api_base);
      //       sessionStorage.setItem("KEY_LOCATION", this.location_uuid);

      //       AppConstant.API_BASE_URL =this.api_base;
      //       AppConstant.LOCAION_UUID = this.location_uuid;

      //       console.log( "mac:::", this.api_base);
      //       },
      //       error:()=>{
      //         alert("Error while adding the product");
      //       }
      //     })

    }

  }

}
