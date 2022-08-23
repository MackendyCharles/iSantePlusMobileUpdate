import { Component, OnInit } from '@angular/core';
import {RecherchePage} from "../pages/recherche/recherche.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pageRec: RecherchePage;
  constructor(private router: Router) { }

  ngOnInit() {
    //console.log("test home");
  }

  reloadReche(){
    console.log('inicial Reload Rechercher')

    this.router.navigateByUrl('/home/recherche');
    this.router.getCurrentNavigation()
    console.log("ojo")
  }

}
