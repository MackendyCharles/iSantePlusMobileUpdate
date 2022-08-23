import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
  settings: any;
  slideOpts = {
    initialSlide: 1,
    speed: 100
  };

  constructor() { 
   
  }

  ngOnInit() {}

}
