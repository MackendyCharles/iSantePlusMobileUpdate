import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialModule} from "../../material.module";
import {ApiService} from "../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../services/tokenStorage.service";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-dialog-ordonnance',
  templateUrl: './dialog-ordonnance.component.html',
  styleUrls: ['./dialog-ordonnance.component.scss'],
})
export class DialogOrdonnanceComponent implements OnInit {

  ordDiagForm !: FormGroup;

  regimeARVResults: any;
  selectedRegimeARV: string;
  regimeARVSelected: any;
  date = new FormControl(new Date());
  codeRegimeARV;
  drug= [];
  maxDate: any;

  actionBtn : string;

  constructor(private materialModule: MaterialModule ,
              private formBuilder: FormBuilder ,
              private api: ApiService ,
              @Inject(MAT_DIALOG_DATA) public editData: any ,
              private dialogRef: MatDialogRef<DialogOrdonnanceComponent> ,
              private token: TokenStorageService ,
              private permissions: AndroidPermissions) { }

  ngOnInit() {

    //console.log(this.editData);
  this.actionBtn = "Save";
    this.maxDate = new Date();
    this.ordDiagForm = this.formBuilder.group({
      regimeARV: [''],
      rxProphy: [''],
      posologieJ: [''],
      posologieJAP: [''],
      nbJours: [''],
      medicamentD: [''],
      medicamentDDD: this.date,
      posologieADP: [''],
      nbJoursADP: [''],
      nbPillulesD: ['']
    })

    //data in the Food
    fetch("./assets/inputFile/regime_drug_json.json")
        .then((resRegimeARV) => resRegimeARV.json())
        .then((jsonRegimeARV) => {
          console.log("results::", jsonRegimeARV);
          this.regimeARVResults = jsonRegimeARV;
        });
  }

  selectedRegimeARV2(event: MatSelectChange) {
    this.regimeARVSelected = event.value


    this.drug = this.regimeARVSelected.drugs;


    // this.foodSelected = event.source.triggerValue;
    console.log(this.drug)

    this.codeRegimeARV = this.regimeARVSelected;
  }

  addRegime(){

    console.log(this.ordDiagForm.value);
   // let mac = this.ordDiagForm.value;

    //alert(JSON.stringify(mac))

    if(this.ordDiagForm.valid){

      sessionStorage.setItem('regimeOrd', JSON.stringify(this.ordDiagForm.value));
      this.ordDiagForm.reset();
      this.dialogRef.close('save');

      // this.api.postRegimeARV(this.ordDiagForm.value)
      //     .subscribe({
      //       next:(res)=> {
      //         alert("Product added successfully");
      //         this.ordDiagForm.reset();
      //         this.dialogRef.close('save');
      //       },
      //       error:()=>{
      //         alert("Error while adding the Ordonnance");
      //       }
      //     })

    }

  }

}
