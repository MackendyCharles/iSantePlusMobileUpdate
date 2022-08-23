import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {ApiService} from "../../../services/api.service";
import {TokenStorageService} from "../../../services/tokenStorage.service";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {DialogOrdonnanceComponent} from "../../../components/dialog-ordonnance/dialog-ordonnance.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ObsDemarrerVisit, ObsGroupRequest, ObsGroupRequestValueNumber, ObsRequest} from "../../../models/obs";
import {NavigationExtras, Router} from "@angular/router";
import {AddEncounterOrdonnance} from "../../../interfaces/addEncounter";
import {EncounterProviderExport} from "../../../models/encounterProvider";
import {AppConstant} from "../../../common/app-constant";
import {strict} from "assert";

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.page.html',
  styleUrls: ['./ordonnance.page.scss'],
})
export class OrdonnancePage implements OnInit {

  date = new FormControl(new Date());
  pet = "arv";


  isAndroid: boolean = false;

  ordonnanceForm !: FormGroup;
  ordonnanceForm1 !: FormGroup;
  maxDate: any;
  patientUUID;
  dataVisit;
  dataSource;
  cp: number = 1;

  patientName: string;

  dataSourcePatient: any
  patientUuid : string;
  pageName: string;
  dataSource2: any;

  donneesRegimeARV : any;

  showRegime : string;

 private  addEncounterOdonnance : AddEncounterOrdonnance;

  constructor(private dialog: MatDialog, private materialModule: MaterialModule, private api : ApiService,public router: Router,
              private formBuilder: FormBuilder ,private token: TokenStorageService ,) {

  }


  openDialog() {
    this.dialog.open(DialogOrdonnanceComponent, {
      width: '60%',
      disableClose: true,
      closeOnNavigation: false,
      //data: this.dataVisit

    }).afterClosed().subscribe(val=>{
      if(val === 'save'){

        this.donneesRegimeARV = JSON.parse(sessionStorage.getItem('regimeOrd'))

       this.getAllRegimeARV();
      }
    })
  }

  ngOnInit() {
    this.loadPatient();
    this.patientUUID = JSON.parse(sessionStorage.getItem('searchPatientUuid'));
    this.dataVisit= JSON.parse(sessionStorage.getItem('detailVisit'));

      console.log("info:::::",this.dataVisit)

      this.token.getUser();
      console.log(this.token.getUser().uuid);

    this.pet;
    this.getAllRegimeARV();

    this.maxDate = new Date();
    this.ordonnanceForm = this.formBuilder.group({
      dateEnCtrl: this.date ,
      pickerDateIni: this.date ,
      pickerDateVis: this.date ,
      arv: [''],
      dispensationComm: [''],
      dispensationDDP: [''],
      visite: [''],
      regime: [''],
    });

    this.ordonnanceForm1 = this.formBuilder.group({
      nomIPPM: [''],
      relationP: [''],
      pickerDatePDARV: this.date ,
      signaturePrest: [''],
      signaturePharmPrest: [''],
      statutFiche: [''],
      revueFiche: [''],
      remarque: [''],
    });
  }

  saveOrdonnance(){

    this.token.getUser();
    console.log(this.token.getUser().uuid);

    this.addEncounterOdonnance = new AddEncounterOrdonnance();
    this.addEncounterOdonnance.encounterDatetime = this.ordonnanceForm.value.dateEnCtrl;
    this.addEncounterOdonnance.patient = this.dataVisit.patient.uuid;
    this.addEncounterOdonnance.encounterType = "10d73929-54b6-4d18-a647-8b7316bc1ae3";
    this.addEncounterOdonnance.location = AppConstant.LOCAION_UUID;

      let encounterProviderExports: EncounterProviderExport[] = [];

      let encounterProviderExport: EncounterProviderExport = new EncounterProviderExport();
      encounterProviderExport.provider = this.token.getUser().provider;
      encounterProviderExport.encounterRole = "ef0445e7-bfe6-4260-a351-09fc835b6bcd";

      encounterProviderExports.push(encounterProviderExport);

      this.addEncounterOdonnance.encounterProviders = encounterProviderExports;

      this.addEncounterOdonnance.visit = this.dataVisit.uuid;



    //===========OBS

    let obs: ObsGroupRequestValueNumber[] = [];

    if( this.ordonnanceForm.value.arv !== ""){
    let obsPatientInscritARV: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsPatientInscritARV.concept = "159811AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsPatientInscritARV.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsPatientInscritARV.person = this.dataVisit.patient.uuid;
    obsPatientInscritARV.value = this.ordonnanceForm.value.arv;
    obs.push(obsPatientInscritARV);
    }

    if(this.ordonnanceForm.value.dispensationComm !== ""){
    let obsDispensationComm: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsDispensationComm.concept = "1755AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsDispensationComm.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsDispensationComm.person = this.dataVisit.patient.uuid;
    if(this.ordonnanceForm.value.dispensationComm)
      obsDispensationComm.value = "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obs.push(obsDispensationComm);
    }

    if(this.ordonnanceForm.value.dispensationDDP !== ""){
    let obsDispensationDDP: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsDispensationDDP.concept = "c2aacdc8-156e-4527-8934-a8fb94162419";
    obsDispensationDDP.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsDispensationDDP.person = this.dataVisit.patient.uuid;
    if(this.ordonnanceForm.value.dispensationDDP)
      obsDispensationDDP.value = "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obs.push(obsDispensationDDP);
    }

    if(this.ordonnanceForm.value.visite !==""){
    let obsVisitType: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsVisitType.concept = "164181AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsVisitType.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsVisitType.person = this.dataVisit.patient.uuid;
    obsVisitType.value = this.ordonnanceForm.value.visite;
    obs.push(obsVisitType);
    }


    if(this.ordonnanceForm.value.pickerDateVis !==""){
    let obsVisiteDateVisite: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsVisiteDateVisite.concept = "159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsVisiteDateVisite.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsVisiteDateVisite.person = this.dataVisit.patient.uuid;
    obsVisiteDateVisite.value = this.ordonnanceForm.value.pickerDateVis;
    obs.push(obsVisiteDateVisite);
    }

    if(this.ordonnanceForm.value.regime !== ""){
    let obsRegimeLigne: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsRegimeLigne.concept = "164432AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsRegimeLigne.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsRegimeLigne.person = this.dataVisit.patient.uuid;
    obsRegimeLigne.value = this.ordonnanceForm.value.regime;
    obs.push(obsRegimeLigne);
    }

    if(this.ordonnanceForm1.value.nomIPPM !==""){
    let obsNomIPPM: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber()
    obsNomIPPM.concept = "163258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsNomIPPM.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsNomIPPM.person = this.dataVisit.patient.uuid;
    obsNomIPPM.value = this.ordonnanceForm1.value.nomIPPM;
    obs.push(obsNomIPPM);
    }

    if(this.ordonnanceForm1.value.relationP !== ""){
    let obsRelationP: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsRelationP.concept = "164352AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsRelationP.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsRelationP.person = this.dataVisit.patient.uuid;
    obsRelationP.value = this.ordonnanceForm1.value.relationP;
    obs.push(obsRelationP);
    }

    if(this.ordonnanceForm1.value.pickerDatePDARV !== ""){
    let obsPickerDatePDARV: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsPickerDatePDARV.concept = "162549AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsPickerDatePDARV.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsPickerDatePDARV.person = this.dataVisit.patient.uuid;
    obsPickerDatePDARV.value = this.ordonnanceForm1.value.pickerDatePDARV;
    obs.push(obsPickerDatePDARV);
    }

    if(this.ordonnanceForm1.value.signaturePrest !== ""){
    let obsSignaturePrest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsSignaturePrest.concept = "1473AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsSignaturePrest.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsSignaturePrest.person = this.dataVisit.patient.uuid;
    obsSignaturePrest.value = this.ordonnanceForm1.value.signaturePrest;
    obs.push(obsSignaturePrest);
    }

    if(this.ordonnanceForm1.value.signaturePharmPrest !== ""){
    let obsSignaturePharmPrest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsSignaturePharmPrest.concept = "f9d7da27-6c7d-4418-a653-fdcf05782f82";
    obsSignaturePharmPrest.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsSignaturePharmPrest.person = this.dataVisit.patient.uuid;
    obsSignaturePharmPrest.value = this.ordonnanceForm1.value.signaturePharmPrest;
    obs.push(obsSignaturePharmPrest);
    }

    if(this.ordonnanceForm1.value.statutFiche !== ""){
    let obsStatutFiche: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsStatutFiche.concept = "163340AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsStatutFiche.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsStatutFiche.person = this.dataVisit.patient.uuid;
    obsStatutFiche.value = this.ordonnanceForm1.value.statutFiche;
    obs.push(obsStatutFiche);
    }

    if(this.ordonnanceForm1.value.revueFiche !== ""){
    let obsRevueFiche: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsRevueFiche.concept = "163341AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsRevueFiche.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsRevueFiche.person = this.dataVisit.patient.uuid;
    if(this.ordonnanceForm1.value.revueFiche)
      obsRevueFiche.value = "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obs.push(obsRevueFiche);
    }

    if(this.ordonnanceForm1.value.remarque !== ""){
    let obsRemarque: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
    obsRemarque.concept = "1e1c4061-47b8-4c4a-ba70-a9f56158c649";
    obsRemarque.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsRemarque.person = this.dataVisit.patient.uuid;
    obsRemarque.value = this.ordonnanceForm1.value.remarque;
    obs.push(obsRemarque);
    }


    ////OBS Les Regimes

   // let obsRegimes: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();


    console.log("before", this.dataSource);
    console.log("after", this.dataSource[0]);
    let madesd =[];

    if(this.dataSource != null){

      console.log("Avan save ordonance")

      console.log(this.dataSource)
      madesd = this.dataSource.regimeARV.drugs[0];
   
    

    console.log("datasoruDrug", madesd)


    ////////Group Ordonance Medicament
    let obsOrdonnanceMedicaments: ObsGroupRequest = new ObsGroupRequest();
    obsOrdonnanceMedicaments.concept = "1442AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsOrdonnanceMedicaments.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsOrdonnanceMedicaments.person = this.dataVisit.patient.uuid;

    let groupMembrerOrdMedi: ObsRequest[] = [];

    for (let i = 0; i< this.dataSource.regimeARV.drugs.length; i++){

      if(this.dataSource.regimeARV.drugs[i].uuid !== ""){
      let obsRegimes: ObsRequest = new ObsRequest();
      obsRegimes.concept = "1282AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsRegimes.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsRegimes.person = this.dataVisit.patient.uuid;
      obsRegimes.value = this.dataSource.regimeARV.drugs[i].uuid;
      groupMembrerOrdMedi.push(obsRegimes);
      }

      if(this.dataSource.posologieJ !==""){
      let obsPedStdDosageFr: ObsRequest = new ObsRequest();
      obsPedStdDosageFr.concept = "1444AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPedStdDosageFr.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsPedStdDosageFr.person = this.dataVisit.patient.uuid;
      obsPedStdDosageFr.value = this.dataSource.posologieJ;
      groupMembrerOrdMedi.push(obsPedStdDosageFr);
      }

      if(this.dataSource.posologieJAP !== ""){
      let obsPosologieJAP: ObsRequest = new ObsRequest();
      obsPosologieJAP.concept = "ca8bc9c3-7f97-450a-8f33-e98f776b90e1";
      obsPosologieJAP.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsPosologieJAP.person = this.dataVisit.patient.uuid;
      obsPosologieJAP.value = this.dataSource.posologieJAP;
      groupMembrerOrdMedi.push(obsPosologieJAP);
      }

      if(this.dataSource.nbJours !== ""){
      let obsNbJours: ObsRequest = new ObsRequest();
      obsNbJours.concept = "159368AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsNbJours.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsNbJours.person = this.dataVisit.patient.uuid;
      obsNbJours.value = this.dataSource.nbJours;
      groupMembrerOrdMedi.push(obsNbJours);
      }

      if(this.dataSource.rxProphy !== ""){
      let obsRxProphy: ObsRequest = new ObsRequest();
      obsRxProphy.concept = "160742AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsRxProphy.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsRxProphy.person = this.dataVisit.patient.uuid;
      obsRxProphy.value = this.dataSource.rxProphy;
      groupMembrerOrdMedi.push(obsRxProphy);
      }
    }

    if(groupMembrerOrdMedi.length > 0){
    obsOrdonnanceMedicaments.groupMembers = groupMembrerOrdMedi;
    // @ts-ignore
    obs.push(obsOrdonnanceMedicaments);
    }



    //////Group Ordonnance Dispencer

    let obsOrdonnanceDispenser: ObsGroupRequest = new ObsGroupRequest();
    obsOrdonnanceDispenser.concept = "163711AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsOrdonnanceDispenser.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
    obsOrdonnanceDispenser.person = this.dataVisit.patient.uuid;

    let groupMembrerOrdDispenser: ObsRequest[] = [];

    for (let i = 0; i< this.dataSource.regimeARV.drugs.length; i++){

      if(this.dataSource.regimeARV.drugs[i].uuid !== ""){
      let obsRegimes2: ObsRequest = new ObsRequest();
      obsRegimes2.concept = "1282AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsRegimes2.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsRegimes2.person = this.dataVisit.patient.uuid;
      obsRegimes2.value = this.dataSource.regimeARV.drugs[i].uuid;
      groupMembrerOrdDispenser.push(obsRegimes2);
      }

      if(this.dataSource.medicamentD !== ""){
      let obsMedicamentD: ObsRequest = new ObsRequest();
      obsMedicamentD.concept = "1276AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsMedicamentD.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsMedicamentD.person = this.dataVisit.patient.uuid;
      obsMedicamentD.value = this.dataSource.medicamentD;
      groupMembrerOrdDispenser.push(obsMedicamentD);
      }

      if(this.dataSource.posologieADP !== ""){
      let obsPosologieADP: ObsRequest = new ObsRequest();
      obsPosologieADP.concept = "1444AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPosologieADP.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsPosologieADP.person = this.dataVisit.patient.uuid;
      obsPosologieADP.value = this.dataSource.posologieADP;
      groupMembrerOrdDispenser.push(obsPosologieADP);
      }

      if(this.dataSource.nbJoursADP !== ""){
      let obsNbJoursADP: ObsRequest = new ObsRequest();
      obsNbJoursADP.concept = "159368AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsNbJoursADP.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsNbJoursADP.person = this.dataVisit.patient.uuid;
      obsNbJoursADP.value = this.dataSource.nbJoursADP;
      groupMembrerOrdDispenser.push(obsNbJoursADP);
      }

      if(this.dataSource.nbPillulesD !== ""){
      let obsNbPillulesD: ObsRequest = new ObsRequest();
      obsNbPillulesD.concept = "1443AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsNbPillulesD.obsDatetime = this.ordonnanceForm.value.dateEnCtrl;
      obsNbPillulesD.person = this.dataVisit.patient.uuid;
      obsNbPillulesD.value = this.dataSource.nbPillulesD;
      groupMembrerOrdDispenser.push(obsNbPillulesD);
      }
    }



    if(groupMembrerOrdDispenser.length > 0){
    obsOrdonnanceDispenser.groupMembers = groupMembrerOrdDispenser;
    // @ts-ignore
    obs.push(obsOrdonnanceDispenser);
    }

  }

    // console.log(obsRegimes);

    this.addEncounterOdonnance.obs = obs;


    // Visit

//     let obsDemarerVisit: ObsDemarrerVisit = new ObsDemarrerVisit();
//         obsDemarerVisit.patient =  this.dataVisit.patient.uuid;
//         obsDemarerVisit.visitType = "7b0f5697-27e3-40c4-8bae-f4049abfb4ed";
//         obsDemarerVisit.startDatetime = this.ordonnanceForm.value.dateEnCtrl;
//         obsDemarerVisit.location = "8d6c993e-c2cc-11de-8d13-0010c6dffd0f"
//         obsDemarerVisit.stopDatetime= new Date(this.ordonnanceForm.value.dateEnCtrl.getTime() + (1 * 60 * 1000));

// this.addEncounterOdonnance.visit =obsDemarerVisit;




    console.log(this.addEncounterOdonnance)

    this.api.postEncounter(this.addEncounterOdonnance)
        .subscribe({
          next: (res)=>{
           // alert("Save successfully")
            const resultOrdonnance=res;
            console.log(resultOrdonnance);

            if(resultOrdonnance != null) {

              this.router.navigateByUrl('/home/dashConsultation').then(() => {
                window.location.reload();
                //  this.router.navigate(['/home/dashConsultation']);
              });

          }

          },
          error: (err)=>{
            alert("Error save")
          }
        })




  }

  getAllRegimeARV(){

    if(this.donneesRegimeARV != null){
      this.dataSource = this.donneesRegimeARV;

      console.log(this.dataSource)
      console.log(this.dataSource.regimeARV.regimen)

      this.showRegime = this.dataSource.regimeARV.regimen;

      //alert(this.dataSource.regimeARV.regimen)

    }






  }

  editRegimeARV(row: any){

  }

  deleteRegimeARV(id: number){

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
      this.dataSource2 = this.pageName;

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

}
