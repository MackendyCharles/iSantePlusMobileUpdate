import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-autre-plan',
  templateUrl: './autre-plan.component.html',
  styleUrls: ['./autre-plan.component.scss'],
})
export class AutrePlanComponent implements OnInit {
  maxDate: any;
  date = new FormControl(new Date());
  autrePlan: FormGroup;


  constructor(private _formBuilder: FormBuilder) { }


  ngOnInit() {
    this.maxDate = new Date();

    this.autrePlan = this._formBuilder.group({
      remarqueAutPlan: "",
      pickerdateProchVisitAutPlan: this.date,
      nomPrenom1AutPlan: "",
      nomPrenom2AutPlan: "",
      nomPrenom3AutPlan: "",

    })
  }

}
