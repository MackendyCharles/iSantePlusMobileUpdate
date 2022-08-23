import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-conduite-tenir',
  templateUrl: './conduite-tenir.component.html',
  styleUrls: ['./conduite-tenir.component.scss'],
})
export class ConduiteTenirComponent implements OnInit {

  maxDate: any;
  date = new FormControl(new Date());
  conduiteTenir: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.conduiteTenir = this._formBuilder.group({
      autre1CondTenir: "",
      autre1TextCondTenir: "",
      autre2CondTenir: "",
      autre2TextCondTenir: "",
      autre3CondTenir: "",
      autre3TextCondTenir: "",
      autre4CondTenir: "",
      autre4TextCondTenir: "",
      autre5CondTenir: "",
      autre5TextCondTenir: "",
      pickerdateProcedureCondTenir: this.date,
      cryotherapieCondTenir: "",
      LEEPCondTenir: "",
      thermocoagulationCondTenir: "",
      conisationCondTenir: "",
      hystérectomieCondTenir: "",
      psychologueCondTenir: "",
      progNutritionCondTenir: "",
      planFamilialeCondTenir: "",
      fichesRefRemplCondTenir: "",
      hospitalisationCondTenir: "",
      autreEtablCliniqueCondTenir: "",

    })
  }

}
