import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import { Router } from '@angular/router';
import {ApiService} from "../../services/api.service";
import {ObsCloseVisit} from "../../models/obs";

@Component({
  selector: 'app-dash-consultation',
  templateUrl: './dashConsultation.page.html',
  styleUrls: ['./dashConsultation.page.scss'],
})
export class DashConsultationPage implements OnInit {

  panelOpenState = false;
  dataSourcePatient: any
  patientUuid : string;
  pageName: string;
  dataSource: any;
  patientName : string;
  dataSourceVisit : any;
  


  constructor(private api : ApiService, public router: Router) { }

  ngOnInit() {
    this.loadPatient();
    this.loadVisit();

   
  }

  showDashPatient(){
    this.router.navigateByUrl('/home/dashPatient').then(() =>{
      window. location. reload();
    })
  }

  loadPatient() {
    let SearchPatient = JSON.parse(sessionStorage.getItem('searchPatientUuid'));
    console.log('Reponse:', SearchPatient.state);
    //console.log(this.router.getCurrentNavigation().extras.state)
    if (SearchPatient) {
      this.pageName = SearchPatient.state;
      console.log(this.pageName)
      // console.log(this.pageName) ;
      this.dataSource = this.pageName;

      this.patientUuid = this.pageName;
      // const patientUuid = this.dataSource.patient.uuid;


      this.api.getPatientUuid(this.patientUuid)
          .subscribe((res) => {

            // console.log(res);

            this.dataSourcePatient = res;
            this.patientName =  this.dataSourcePatient.person.display;

            console.log(this.dataSourcePatient)



          });

      // console.log(this.dataSource.patient.links[0].uri);


    }
  }

  terminerConsultation(){
    let obsCloseVisit: ObsCloseVisit = new ObsCloseVisit();
    obsCloseVisit.stopDatetime= new Date();

    let visit = JSON.parse(sessionStorage.getItem('detailVisit'));

    let visitCloseUuid = visit.uuid;

    this.api.closeVisit(obsCloseVisit, visitCloseUuid)
        .subscribe({
          next : (res) =>{
            let resultsClose = res.results;
            console.log("Active Visit", resultsClose);
            this.showDashPatient();


          },
          error: (err) => {
            alert("Error while Active Visit")
          }
        })

  }


  loadVisit(){
    let visit = JSON.parse(sessionStorage.getItem('detailVisit'));

    console.log("Visit:::::", visit.uuid)

    const visit2 = visit.uuid;

    this.api.getPatientVisit(visit2)
    .subscribe((res) => {

       console.log("result get visit",res);



      this.dataSourceVisit = res.encounters;
     // this.patientName =  this.dataSourcePatient.person.display;

      console.log("Mades::::", this.dataSourceVisit)



    });

   


  }

  onClick(item: any){

  }


}
