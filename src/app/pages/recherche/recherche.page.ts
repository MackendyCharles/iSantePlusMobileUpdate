import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {NavController} from "@ionic/angular";
import {DashPatientPage} from "../dashPatient/dashPatient.page";

@Component({
    selector: 'app-recherche',
    templateUrl: './recherche.page.html',
    styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {

    items;
    data;
    cp: number = 1;
    pageP: DashPatientPage;

    constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {
        console.log("loard first")
    }



    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () =>{
            return false;
        }
        console.log("reload recherche")
    }

    getPatient(patcriteria, limit) {

        this.api.getPatientByCriteria(patcriteria, limit)
            .subscribe({
                next: (res) => {
                    // alert("Save successfully")
                    this.data = res;
                    // console.log(res);
                },
                error: (err) => {
                    // alert("Error save")
                }
            })

    }


    onClick(item: any) {
        //console.log(item);

       let navigationExtras: NavigationExtras = {
           state: item
       };
       console.log(navigationExtras)
       sessionStorage.setItem('searchPatientUuid', JSON.stringify(navigationExtras));

        window.close();
        this.router.navigateByUrl('/home/dashPatient').then(() =>{
            window. location. reload();
        })

    }


    getItems(ev) {
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {

            this.api.getPatientByCriteria(val, 100)
                .subscribe({
                    next: (res) => {
                        console.log(res)
                        this.data = res.results;
                        this.data.forEach(element => {
                        })
                    },
                    error: (err) => {
                    }
                })
        }
    }

}
