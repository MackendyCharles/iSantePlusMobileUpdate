import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-resultat-traitement-tb',
  templateUrl: './resultat-traitement-tb.component.html',
  styleUrls: ['./resultat-traitement-tb.component.scss'],
})
export class ResultatTraitementTBComponent implements OnInit {
  maxDate: any;
  date = new FormControl(new Date());
  resultatTraitementTB: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resultatTraitementTB = this._formBuilder.group({
      pickerdateArretTraitementResultTB: this.date,
      resultatTextTB: "",
    })

  }

}
