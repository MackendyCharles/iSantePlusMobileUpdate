import {LoginPage} from './../login/login.page';
import {ApiService} from '../../services/api.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Obs, ObsCloseVisit, ObsDemarrerVisit} from "../../models/obs";

@Component({
    selector: 'app-dash-patient',
    templateUrl: './dashPatient.page.html',
    styleUrls: ['./dashPatient.page.scss'],
})
export class DashPatientPage implements OnInit {

    panelOpenState = true;
    public pageName: any;
    data;
    sexePatient: any;

    patientName : string;


    dataSource: any;
    datasourceVitaux: any;
    datasourceVitauxUpdate: any;

    dataSourcePatient: any;



    _hauteur: any[];
    _poids: any[];
    _temperature: any[];
    _pouls: any;
    _frequenseResp: any;
    _saturationOxySan: any;
    _tensionArtSyst: any;
    _tensionArtDiast: any;

    dataVisit: any;

    dataActiveVisit: any[];


    @ViewChild(MatAccordion) accordion: MatAccordion;

    constructor(public router: Router, private api: ApiService, private activatedRoute: ActivatedRoute) {
        // this.loadPatient();
        this.ngOnInit();
    }



    ngOnInit() {

       // this.dataVisit= JSON.parse(sessionStorage.getItem('detailVisit'));

         this.loadPatient();

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

            const patientUuid = this.pageName;
            // const patientUuid = this.dataSource.patient.uuid;


            this.api.getPatientUuid(patientUuid)
                .subscribe((res) => {

                    // console.log(res);

                    this.dataSourcePatient = res;

                    this.patientName =  this.dataSourcePatient.person.display;

                    console.log("partienr::: ",this.dataSourcePatient)

                    this.api.getVitauxPatientEncounterType(this.dataSourcePatient.person.uuid, "67a71486-1a54-468f-ac3e-7091a9a79584")
                        .subscribe({
                            next: (res) => {
                                this.datasourceVitaux = res;

                                console.log("vital::::",  this.datasourceVitaux );
                                

                                if (this.datasourceVitaux.results.length > 0) {
                                    let size = this.datasourceVitaux.results.length - 1
                                    console.log(this.datasourceVitaux.results[size])

                                    let enreVitaux = this.datasourceVitaux.results[size].display.split(" ", 2);

                                    console.log(this.datasourceVitaux.results[size].display.split(" ", 2));

                                    if (enreVitaux[0] == "Enregistrement") {

                                    } else {
                                        if (this.datasourceVitaux.results.length > 0) {
                                            this.api.getVitauxEncounter(this.datasourceVitaux.results[size].uuid)
                                                .subscribe({
                                                    next: (res) => {

                                                        console.log("mack", res)

                                                        

                                                        this.datasourceVitauxUpdate = res;

                                                        if(this.datasourceVitauxUpdate.obs.length){
                                                            console.log("legth::::", this.datasourceVitauxUpdate.obs.length);

                                                            for(let i = 0; i < this.datasourceVitauxUpdate.obs.length; i++){
                                                                let display = this.datasourceVitauxUpdate.obs[i].display;
                                                                let nameDisplay = display.split(":", 1 );
                                                                console.log("NameDis:::", nameDisplay);
                                                                
                                                                if(nameDisplay == "Taille (CM)"){
                                                                    this._hauteur = display.split(":", 2 );
                                                                    console.log("Haut::", this._hauteur);
                                                                    
                                                                }else if(nameDisplay == "POIDS (KG)"){
                                                                    this._poids = display.split(":", 2 );
                                                                    console.log("Poids:::", this._poids);
                                                                    
                                                                }else if(nameDisplay == "TEMPÉRATURE (C)"){
                                                                    this._temperature = display.split(":", 2 );
                                                                    console.log("Temp:::", this._temperature);
                                                                    
                                                                }else if(nameDisplay == "Pouls"){
                                                                    this._pouls = display.split(":", 2 );
                                                                    console.log("Poul:::", this._pouls);
                                                                    
                                                                }else if(nameDisplay == "Rythme respiratoire"){
                                                                    this._frequenseResp = display.split(":", 2 );
                                                                    console.log("Rythme:::", this._frequenseResp);
                                                                    
                                                                }else if(nameDisplay == "Saturation d'oxygène dans le sang"){
                                                                    this._saturationOxySan = display.split(":", 2 );
                                                                    console.log("Satur:::", this._saturationOxySan);
                                                                    
                                                                }else if(nameDisplay == "TENSION ARTÉRIELLE SYSTOLIQUE"){
                                                                    this._tensionArtSyst = display.split(":", 2 );
                                                                    console.log("Systog:::", this._tensionArtSyst);
                                                                    
                                                                }else if(nameDisplay == "TENSION ARTÉRIELLE DIASTOLIQUE"){
                                                                    this._tensionArtDiast = display.split(":", 2 );
                                                                    console.log("Diatog:::", this._tensionArtDiast);
                                                                    
                                                                }
                                                            }
                                                            
                                                        }

                                                     //   this._hauteur = this.datasourceVitauxUpdate.obs[5].display.split(":", 2);
                                                     //   this._poids = this.datasourceVitauxUpdate.obs[4].display.split(":", 2);
                                                      //  this._temperature = this.datasourceVitauxUpdate.obs[3].display.split(":", 2);
                                                       // this._pouls = this.datasourceVitauxUpdate.obs[2].display.split(":", 2);
                                                      //  this._frequenseResp = this.datasourceVitauxUpdate.obs[7].display.split(":", 2);
                                                      //  this._saturationOxySan = this.datasourceVitauxUpdate.obs[6].display.split(":", 2);
                                                       // this._tensionArtSyst = this.datasourceVitauxUpdate.obs[0].display.split(":", 2);
                                                       // this._tensionArtDiast = this.datasourceVitauxUpdate.obs[1].display.split(":", 2);



                                                    },
                                                    error: (err) => {

                                                    }
                                                })
                                        }
                                    }

                                }


                                //console.log(this.datasourceVitaux.results)

                            },
                            error: (err) => {
                                alert("Error while fetching the Records")
                            }
                        })


                    this.api.getPatientActiveVisit(patientUuid)
                        .subscribe({
                            next : (res) =>{
                                this.dataActiveVisit = res.results;
                                console.log("Active Visit", this.dataActiveVisit);

                                console.log("results:::", this.dataActiveVisit.length)

                                if(this.dataActiveVisit.length > 0){
                                    this.dataVisit = 1;
                                    console.log("voir sa kak pase", this.dataVisit)
                                }



                            },
                            error: (err) => {
                                alert("Error while Active Visit")
                            }
                        })

                });

            // console.log(this.dataSource.patient.links[0].uri);


        }
    }

    addVitaux() {

        let navigationExtras: NavigationExtras = {
            state: {
                patientUuid: this.pageName
                // encounterUuid: this.dataSource.uuid
            }
        }
        console.log(navigationExtras);

        this.router.navigateByUrl('home/dashVitaux', navigationExtras)

    }

    addAllergies() {

        let navigationExtras: NavigationExtras = {
            state: {
                patientUuid: this.pageName
                // encounterUuid: this.dataSource.uuid
            }
        }
        console.log(navigationExtras);

        this.router.navigateByUrl('home/allergies', navigationExtras)


    }

    terminerConsultation(){
       let obsCloseVisit: ObsCloseVisit = new ObsCloseVisit();
       obsCloseVisit.stopDatetime= new Date();


       let visitCloseUuid = this.dataActiveVisit[0].uuid;

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

    demarrerConsultation() {

        // this.router.navigateByUrl('/home/dashConsultation').then(() => {
        //     window.location.reload();
        //     this.router.navigate(['/home/dashConsultation']);
        // });


        let obsDemarerVisit: ObsDemarrerVisit = new ObsDemarrerVisit();
        obsDemarerVisit.patient = this.pageName;
        obsDemarerVisit.visitType = "7b0f5697-27e3-40c4-8bae-f4049abfb4ed";
        obsDemarerVisit.startDatetime = new Date();
        obsDemarerVisit.location = "8d6c993e-c2cc-11de-8d13-0010c6dffd0f"

        console.log(obsDemarerVisit)
        this.api.postVisit(obsDemarerVisit)
            .subscribe({
                next: (res) => {
                    //alert("Save successfully")
                    const resultSavePatient = res;
                    console.log("Visit::::", resultSavePatient);

                    sessionStorage.setItem('detailVisit', JSON.stringify(resultSavePatient));

                    this.router.navigateByUrl('/home/dashConsultation').then(() => {
                        window.location.reload();
                      //  this.router.navigate(['/home/dashConsultation']);
                    });

                    // this.router.navigateByUrl('home/dashConsultation', navigationExtras);


                },
                error: (err) => {
                    alert("Error save")
                }
            })


    }

    showDashPatient(){
       //this.ngOnInit();
        this.router.navigateByUrl('/home/dashPatient').then(() =>{
            window. location. reload();
        })
    }



}
