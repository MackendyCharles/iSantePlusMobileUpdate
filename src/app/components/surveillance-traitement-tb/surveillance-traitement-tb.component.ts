import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-surveillance-traitement-tb',
  templateUrl: './surveillance-traitement-tb.component.html',
  styleUrls: ['./surveillance-traitement-tb.component.scss'],
})
export class SurveillanceTraitementTBComponent implements OnInit {

  maxDate: any;
  date = new FormControl(new Date());
  surveillanceTraitementTB: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.surveillanceTraitementTB = this._formBuilder.group({
      pickerdate0STTB: this.date,
      BacilloscopieMois0STTB: "",
      poidsMois0STTB: "",
      pickerdate2STTB: this.date,
      BacilloscopieMois2STTB: "",
      poidsMois2STTB: "",
      pickerdate3STTB: this.date,
      BacilloscopieMois3STTB: "",
      poidsMois3STTB: "",
      pickerdate5STTB: this.date,
      BacilloscopieMois5STTB: "",
      poidsMois5STTB: "",
      pickerdateFrxSTTB: this.date,
      BacilloscopieMoisFrxSTTB: "",
      poidsMoisFrxSTTB: "",

    });
  }

}
