import { PatientIdentifier } from './../../models/patientIdentifier';
import { PersonAttributeType } from './../../models/personAttributeType';
import { PersonAttribute } from './../../models/personAttribute';
import { PersonAddress } from './../../models/personAddress';
import { PersonName } from './../../models/personName';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import {AppConstant} from "../../common/app-constant";
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatSelectChange, MatSelectTrigger } from "@angular/material/select";
import { DataService } from "src/app/services/data.service";
import { AddPatient } from "../../interfaces/add-patient"
import { Person } from 'src/app/models/person';
import { IdentifierType } from 'src/app/models/identifier_type';
import { Locations } from 'src/app/models/locations';
import { Patient } from 'src/app/models/patient';

import { EncounterRequest } from 'src/app/models/encounter';
import { AddEncounter } from 'src/app/interfaces/addEncounter';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { EncounterProvider, EncounterProviderExport } from 'src/app/models/encounterProvider';
import { EncounterRole } from 'src/app/models/encounterRole';
import { Obs, ObsGroupRequest, ObsRequest } from 'src/app/models/obs';
import { Observable } from 'rxjs';
import {LoadingController} from "@ionic/angular";


interface SexePatient {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-patient",
  templateUrl: "./patient.page.html",
  styleUrls: ["./patient.page.scss"],
})
export class PatientPage implements OnInit {



  private addPatient: AddPatient;

  private addEncounter: AddEncounter;
  private person: Person;
  private personName: PersonName;
  private personAddress: PersonAddress;
  private personAttribute: PersonAttribute;


  date = new FormControl(new Date());

  countriesLieuNais: any;
  statesLieuNais: any;
  municipalitiesLieuNais: any;

  selectedCountryLieuNais: any = {
    id: 0,
    name: "",
  };
  selectedStateLieuNais: any = {
    id: 0,
    name: "",
  };

  countriesInfCont: any;
  statesInfCont: any;
  municipalitiesInfCont: any;

  selectedCountryInfCont: any = {
    id: 0,
    name: "",
  };
  selectedStateInfCont: any = {
    id: 0,
    name: "",
  };

  countriesConUrg: any;
  statesConUrg: any;
  municipalitiesConUrg: any;

  selectedCountryConUrg: any = {
    id: 0,
    name: "",
  };
  selectedStateConUrg: any = {
    id: 0,
    name: "",
  };

  countriesPrePer: any;
  statesPrePer: any;
  municipalitiesPrePer: any;

  selectedCountryPrePer: any = {
    id: 0,
    name: "",
  };
  selectedStatePrePer: any = {
    id: 0,
    name: "",
  };

  countriesDeuPer: any;
  statesDeuPer: any;
  municipalitiesDeuPer: any;

  selectedCountryDeuPer: any = {
    id: 0,
    name: "",
  };
  selectedStateDeuPer: any = {
    id: 0,
    name: "",
  };

  professionResults: any;
  religionResults: any;
  statutMaritalResults: any;

  lienResultsCon: any;
  lienResultsPre: any;
  lienResultsDeu: any;

  selectedProfession: string;
  selectedReligion: string;
  selectedStatutMarital: string;
  selectedLienCon: string;
  selectedLienPre: string;
  selectedLienDeu: string;
  selectedSexe: string;

  sexePatients: SexePatient[] = [
    { value: "M", viewValue: "Masculin" },
    { value: "F", viewValue: "Feminin" },
  ];

  maxDate: any;
  isLinear = true;

  public results: any = [];

  dateEnregistrement: FormGroup;

  empreintesDigitales: FormGroup;
  donneesDemographiques: FormGroup;
  identifiants: FormGroup;
  informationsContact: FormGroup;
  social: FormGroup;
  contactUrgence: FormGroup;
  premPersResponsables: FormGroup;
  deuxPersResponsables: FormGroup;
  confirmer: FormGroup;


  paysLieuNaisSelected: any = "";
  departLieuNaisSelected: any = "";
  commLieuNaisSelected: any = "";

  paysInfContSelected: any = "";
  departInfContSelected: any = "";
  commInfConSelected: any = "";

  paysConUrgSelected: any = "";
  departConUrgSelected: any = "";
  commConUrgSelected: any = "";

  paysPreSelected: any = "";
  departPreSelected: any = "";
  commPreSelected: any = "";

  paysDeuSelected: any = "";
  departDeuSelected: any = "";
  commDeuSelected: any = "";

  statutMaritalSelected: any = "";
  professionSelected: any = "";
  religionSelected: any = "";

  LienConUrgselected: any = "";
  LienPre2selected: any = "";
  LienDeu2selected: any = "";

  sexeSelected: any;


public macSta;




  constructor(
    private _formBuilder: FormBuilder,
    private dataServices: DataService,
    private api: ApiService,
    public router: Router,
    private token: TokenStorageService,
    private permissions: AndroidPermissions,
    private loadingCtrl: LoadingController
  ) {

  }



  ngOnInit() {
    this.maxDate = new Date();
    this.dateEnregistrement = this._formBuilder.group({
      dateEnCtrl: this.date,
    });
    this.empreintesDigitales = this._formBuilder.group({
      // secondCtrl: ['', Validators.required],
    });
    this.donneesDemographiques = this._formBuilder.group({
      nomPatient: ["", Validators.required],
      prenomPatient: ["", Validators.required],
      sexePatient: ["", Validators.required],
      dateNaissance: ["", Validators.required],
      nomMere: [""],
      paysNaisPat: [""],
      departNaisPat: [""],
      commNaisPat: [""],
      adresseNaisPat: [""],
    });
    this.identifiants = this._formBuilder.group({
      stCodePatient: [""],
      codeNationalPat: ["", Validators.required],
      codePCPatient: [""],
    });
    this.informationsContact = this._formBuilder.group({
      paysInfCont: [""],
      departInfCont: [""],
      commInfCont: [""],
      adresseInfCont: [""],
      telephoneInfCont: [""],
    });
   
    this.social = this._formBuilder.group({
      statutMarital: [""],
      profession: [""],
      religion: [""],
    });
 
   
    

    this.contactUrgence = this._formBuilder.group({
      lienParentConUrg: [""],
      nomPrenomLienConUrg: [""],
      paysConUrg: [""],
      departConUrg: [""],
      commConUrg: [""],
      adresseConUrg: [""],
      telephoneConUrg: [""],
    });

    this.premPersResponsables = this._formBuilder.group({
      lienParentPre: [""],
      nomPrenomLienPre: [""],
      paysPre: [""],
      departPre: [""],
      commPre: [""],
      adressePre: [""],
      telephonePre: [""],
    });

    this.deuxPersResponsables = this._formBuilder.group({
      lienParentDeu: [""],
      nomPrenomLienDeu: [""],
      paysDeu: [""],
      departDeu: [""],
      commDeu: [""],
      adresseDeu: [""],
      telephoneDeu: [""],
    });



    //data in the profession
    fetch("./assets/inputFile/profession.json")
      .then((resPro) => resPro.json())
      .then((jsonPro) => {
        console.log("results::", jsonPro);
        this.professionResults = jsonPro;
      });

    //data in the Religion
    fetch("./assets/inputFile/religion.json")
      .then((resRel) => resRel.json())
      .then((jsonRel) => {
        console.log("resultsRel::", jsonRel);
        this.religionResults = jsonRel;
      });

    fetch("./assets/inputFile/statutMarital.json")
      .then((resSta) => resSta.json())
      .then((jsonSta) => {
        console.log("resultsSta::", jsonSta);
        this.statutMaritalResults = jsonSta;   
        
      });      

    fetch("./assets/inputFile/lien.json")
      .then((resLien) => resLien.json())
      .then((jsonLien) => {
        console.log("resultsLien::", jsonLien);
        this.lienResultsCon = jsonLien;
      });
    fetch("./assets/inputFile/lien.json")
      .then((resLien) => resLien.json())
      .then((jsonLien) => {
        console.log("resultsLien::", jsonLien);
        this.lienResultsPre = jsonLien;
      });
    fetch("./assets/inputFile/lien.json")
      .then((resLien) => resLien.json())
      .then((jsonLien) => {
        console.log("resultsLien::", jsonLien);
        this.lienResultsDeu = jsonLien;
      });

    this.showAllLieuNais();
    this.onSelectLieuNais(this.selectedCountryLieuNais.id);
    this.onSelect2LieuNais(this.selectedStateLieuNais.id);

    this.showAllInfCont();
    this.onSelectInfCont(this.selectedCountryInfCont.id);
    this.onSelect2InfCont(this.selectedStateInfCont.id);

    this.showAllConUrg();
    this.onSelectConUrg(this.selectedCountryConUrg.id);
    this.onSelect2ConUrg(this.selectedStateConUrg.id);

    this.showAllPrePer();
    this.onSelectPrePer(this.selectedCountryPrePer.id);
    this.onSelect2PrePer(this.selectedStatePrePer.id);

    this.showAllDeuPer();
    this.onSelectDeuPer(this.selectedCountryDeuPer.id);
    this.onSelect2DeuPer(this.selectedStateDeuPer.id);

    // this.selectedStatutMarital = [{value:'1067', label:'Inconnu'}]; 
    // this.selectedProfession = [{value:'1067', label:'Inconnu'}]; 
    // this.selectedReligion = [{value:'1067', label:'Inconnu'}]; 
    
    
  }

  async AddPatient() {

    let person: Person = new Person();

    let personNames: PersonName[] = [];

    let personName: PersonName = new PersonName();
    personName.familyName = this.donneesDemographiques.value.nomPatient;
    personName.givenName = this.donneesDemographiques.value.prenomPatient;
    personNames.push(personName);
    person.names = personNames;

    person.gender = this.donneesDemographiques.value.sexePatient;
    person.birthdate = this.donneesDemographiques.value.dateNaissance;

    // if()

    let addresses: PersonAddress[] = [];

    let address: PersonAddress = new PersonAddress();
    address.address1 = this.informationsContact.value.adresseInfCont;
    address.cityVillage = this.commInfConSelected;
    address.stateProvince = this.departInfContSelected;
    address.country = this.paysInfContSelected;
    addresses.push(address);
    person.addresses = addresses;

    let attributes: PersonAttribute[] = [];


    // nom de la mere
    console.log("gggggg:::", this.donneesDemographiques.value.nomMere);

    if (this.donneesDemographiques.value.nomMere !== "") {
      let attributeNomMere: PersonAttribute = new PersonAttribute();
      let atributeTypeNomMere: PersonAttributeType = new PersonAttributeType();
      atributeTypeNomMere.uuid = '8d871d18-c2cc-11de-8d13-0010c6dffd0f';
      attributeNomMere.attributeType = atributeTypeNomMere.uuid;
      attributeNomMere.value = this.donneesDemographiques.value.nomMere;
      attributes.push(attributeNomMere);
    }


    //Telephone Inf Contact
    if (this.informationsContact.value.telephoneInfCont !== "") {
      let attributeTelephoneInfCont: PersonAttribute = new PersonAttribute();
      let atributeTypeTelephoneInfCont: PersonAttributeType = new PersonAttributeType();
      atributeTypeTelephoneInfCont.uuid = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
      attributeTelephoneInfCont.attributeType = atributeTypeTelephoneInfCont.uuid;
      attributeTelephoneInfCont.value = this.informationsContact.value.telephoneInfCont;
      attributes.push(attributeTelephoneInfCont);
    }


    console.log("statut marital: ", this.statutMaritalSelected);


    //Statut Marital
    if (this.statutMaritalSelected !== "") {
      let attributeStatutMarital: PersonAttribute = new PersonAttribute();
      let attributeTypeStatutMarital: PersonAttributeType = new PersonAttributeType();
      attributeTypeStatutMarital.uuid = '8d871f2a-c2cc-11de-8d13-0010c6dffd0f';
      attributeStatutMarital.attributeType = attributeTypeStatutMarital.uuid;
      attributeStatutMarital.value = this.statutMaritalSelected;
      attributes.push(attributeStatutMarital);
    }


    if (attributes.length > 0)
      person.attributes = attributes;


    let identifiers: PatientIdentifier[] = [];


    // code ST
    if (this.identifiants.value.stCodePatient !== "") {
      let codeSt: PatientIdentifier = new PatientIdentifier();
      codeSt.identifier = this.identifiants.value.stCodePatient;
      let identifierTypeSt: IdentifierType = new IdentifierType();
      identifierTypeSt.uuid = "d059f6d0-9e42-4760-8de1-8316b48bc5f1";
      codeSt.identifierType = identifierTypeSt.uuid;
      let locationSt: Locations = new Locations();
      locationSt.uuid = AppConstant.LOCAION_UUID;
      codeSt.location = locationSt.uuid;
      identifiers.push(codeSt);
    }


    //Code National
    if (this.identifiants.value.codeNationalPat !== "") {
      let codeNational: PatientIdentifier = new PatientIdentifier();
      codeNational.identifier = this.identifiants.value.codeNationalPat;
      let identifierTypeNational: IdentifierType = new IdentifierType();
      identifierTypeNational.uuid = "9fb4533d-4fd5-4276-875b-2ab41597f5dd";
      codeNational.identifierType = identifierTypeNational.uuid;
      let locationNational: Locations = new Locations();
      locationNational.uuid = AppConstant.LOCAION_UUID;
      codeNational.location = locationNational.uuid;
      identifiers.push(codeNational);
    }


    //Code PC
    if (this.identifiants.value.codePCPatient !== "") {
      let codePc: PatientIdentifier = new PatientIdentifier();
      codePc.identifier = this.identifiants.value.codePCPatient;
      let identifierTypePC: IdentifierType = new IdentifierType();
      identifierTypePC.uuid = "b7a154fd-0097-4071-ac09-af11ee7e0310";
      codePc.identifierType = identifierTypePC.uuid;
      let locationPC: Locations = new Locations();
      locationPC.uuid = AppConstant.LOCAION_UUID;
      codePc.location = locationPC.uuid;
      identifiers.push(codePc);
    }


    this.addPatient = new AddPatient();

    this.addPatient.person = person;
    this.addPatient.identifiers = identifiers;


    console.log(this.addPatient);

    this.token.getUser();
    console.log(this.token.getUser().uuid);


    this.addEncounter = new AddEncounter();

    this.addEncounter.encounterDatetime = this.dateEnregistrement.value.dateEnCtrl;

    let addPatients: AddPatient[] = [];

    let addPatient: AddPatient = new AddPatient();

    addPatient.identifiers = identifiers;
    addPatient.person = person;
    addPatients.push(addPatient);
    this.addEncounter.patient = addPatients;
    this.addEncounter.encounterType = "873f968a-73a8-4f9c-ac78-9f4778b751b6";
    this.addEncounter.location = AppConstant.LOCAION_UUID;

    let encounterProviderExports: EncounterProviderExport[] = [];

    let encounterProviderExport: EncounterProviderExport = new EncounterProviderExport();
    encounterProviderExport.provider = this.token.getUser().provider;
    encounterProviderExport.encounterRole = "ef0445e7-bfe6-4260-a351-09fc835b6bcd";

    encounterProviderExports.push(encounterProviderExport);

    this.addEncounter.encounterProviders = encounterProviderExports;


    /////OBS

    let obs: ObsGroupRequest[] = [];

    // START birthplace patient

    let obsbirthplaceGroupRequest: ObsGroupRequest = new ObsGroupRequest();
    obsbirthplaceGroupRequest.person = "";
    obsbirthplaceGroupRequest.concept = "165194AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsbirthplaceGroupRequest.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;


    let groupMemberbirthplace: ObsRequest[] = [];


    if (this.paysInfContSelected !== "") {
      let obsbirthplaceObsRequestPays: ObsRequest = new ObsRequest();
      obsbirthplaceObsRequestPays.person = "";
      obsbirthplaceObsRequestPays.concept = "165198AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsbirthplaceObsRequestPays.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsbirthplaceObsRequestPays.value = this.paysInfContSelected;
      groupMemberbirthplace.push(obsbirthplaceObsRequestPays);
    }

    if (this.departInfContSelected !== "") {
      let obsbirthplaceObsRequestDepart: ObsRequest = new ObsRequest();
      obsbirthplaceObsRequestDepart.person = "";
      obsbirthplaceObsRequestDepart.concept = "165197AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsbirthplaceObsRequestDepart.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsbirthplaceObsRequestDepart.value = this.departInfContSelected;
      groupMemberbirthplace.push(obsbirthplaceObsRequestDepart);
    }

    if (this.commInfConSelected !== "") {
      let obsbirthplaceObsRequestComm: ObsRequest = new ObsRequest();
      obsbirthplaceObsRequestComm.person = "";
      obsbirthplaceObsRequestComm.concept = "1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsbirthplaceObsRequestComm.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsbirthplaceObsRequestComm.value = this.commInfConSelected;
      groupMemberbirthplace.push(obsbirthplaceObsRequestComm);
    }


    if (this.informationsContact.value.adresseInfCont !== "") {
      let obsbirthplaceObsRequestAddre: ObsRequest = new ObsRequest();
      obsbirthplaceObsRequestAddre.person = "";
      obsbirthplaceObsRequestAddre.concept = "165195AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsbirthplaceObsRequestAddre.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsbirthplaceObsRequestAddre.value = this.informationsContact.value.adresseInfCont;
      groupMemberbirthplace.push(obsbirthplaceObsRequestAddre);
    }


    obsbirthplaceGroupRequest.groupMembers = groupMemberbirthplace;
    obs.push(obsbirthplaceGroupRequest);


    // END birthplace  patient


    // START INFORMATION DE CONTACT

    let obsInfContsGroupRequest: ObsGroupRequest = new ObsGroupRequest();
    obsInfContsGroupRequest.person = "";
    obsInfContsGroupRequest.concept = "165211AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsInfContsGroupRequest.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;


    let groupMemberInfoCont: ObsRequest[] = [];

    if (this.informationsContact.value.telephoneInfCont !== "") {
      let obsInfContObsRequestPhone: ObsRequest = new ObsRequest();
      obsInfContObsRequestPhone.person = "";
      obsInfContObsRequestPhone.concept = "159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsInfContObsRequestPhone.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsInfContObsRequestPhone.value = this.informationsContact.value.telephoneInfCont;
      groupMemberInfoCont.push(obsInfContObsRequestPhone);
    }


    if (this.paysInfContSelected !== "") {
      let obsInfContObsRequestPays: ObsRequest = new ObsRequest();
      obsInfContObsRequestPays.person = "";
      obsInfContObsRequestPays.concept = "165198AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsInfContObsRequestPays.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsInfContObsRequestPays.value = this.paysInfContSelected;
      groupMemberInfoCont.push(obsInfContObsRequestPays);
    }


    if (this.departInfContSelected !== "") {
      let obsInfContObsRequestDepart: ObsRequest = new ObsRequest();
      obsInfContObsRequestDepart.person = "";
      obsInfContObsRequestDepart.concept = "165197AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsInfContObsRequestDepart.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsInfContObsRequestDepart.value = this.departInfContSelected;
      groupMemberInfoCont.push(obsInfContObsRequestDepart);
    }


    if (this.commInfConSelected !== "") {
      let obsInfContObsRequestComm: ObsRequest = new ObsRequest();
      obsInfContObsRequestComm.person = "";
      obsInfContObsRequestComm.concept = "1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsInfContObsRequestComm.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsInfContObsRequestComm.value = this.commInfConSelected;
      groupMemberInfoCont.push(obsInfContObsRequestComm);
    }


    if (this.informationsContact.value.adresseInfCont !== "") {
      let obsInfContObsRequestAddre: ObsRequest = new ObsRequest();
      obsInfContObsRequestAddre.person = "";
      obsInfContObsRequestAddre.concept = "165195AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsInfContObsRequestAddre.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsInfContObsRequestAddre.value = this.informationsContact.value.adresseInfCont;
      groupMemberInfoCont.push(obsInfContObsRequestAddre);
    }


    obsInfContsGroupRequest.groupMembers = groupMemberInfoCont;
    obs.push(obsInfContsGroupRequest);


    // END INFORMATION DE CONTACT


    if (this.professionSelected !== "") {
      let obsSocialRequestProfe: ObsGroupRequest = new ObsGroupRequest();
      obsSocialRequestProfe.person = "";
      obsSocialRequestProfe.concept = "1542AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsSocialRequestProfe.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsSocialRequestProfe.value = this.professionSelected;
      obs.push(obsSocialRequestProfe);
    }


    if (this.religionSelected !== "") {
      let obsSocialRequestRelig: ObsGroupRequest = new ObsGroupRequest();
      obsSocialRequestRelig.person = "";
      obsSocialRequestRelig.concept = "162929AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsSocialRequestRelig.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsSocialRequestRelig.value = this.religionSelected;
      obs.push(obsSocialRequestRelig);
    }


    // START CONTACT EN CAS D'URGENCE


    let obsContUrgGroupRequest: ObsGroupRequest = new ObsGroupRequest();
    obsContUrgGroupRequest.person = "";
    obsContUrgGroupRequest.concept = "165210AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsContUrgGroupRequest.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;


    let groupMemberContUrg: ObsRequest[] = [];

    if (this.LienConUrgselected !== "") {
      let obsContUrgObsRequestLien: ObsRequest = new ObsRequest();
      obsContUrgObsRequestLien.person = "";
      obsContUrgObsRequestLien.concept = "164352AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestLien.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestLien.value = this.contactUrgence.value.lienParentConUrg;
      groupMemberContUrg.push(obsContUrgObsRequestLien);

    }


    if (this.contactUrgence.value.nomPrenomLienConUrg !== "") {
      let obsContUrgObsRequestNomPrenom: ObsRequest = new ObsRequest();
      obsContUrgObsRequestNomPrenom.person = "";
      obsContUrgObsRequestNomPrenom.concept = "163258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestNomPrenom.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestNomPrenom.value = this.contactUrgence.value.nomPrenomLienConUrg;
      groupMemberContUrg.push(obsContUrgObsRequestNomPrenom);
    }


    console.log("teleg::::", this.contactUrgence.value.telephoneConUrg);

    if (this.contactUrgence.value.telephoneConUrg !== "") {
      let obsContUrgObsRequestPhone: ObsRequest = new ObsRequest();
      obsContUrgObsRequestPhone.person = "";
      obsContUrgObsRequestPhone.concept = "159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestPhone.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestPhone.value = this.contactUrgence.value.telephoneConUrg;
      groupMemberContUrg.push(obsContUrgObsRequestPhone);
    }

    if (this.paysConUrgSelected !== "") {
      let obsContUrgObsRequestPays: ObsRequest = new ObsRequest();
      obsContUrgObsRequestPays.person = "";
      obsContUrgObsRequestPays.concept = "165198AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestPays.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestPays.value = this.paysConUrgSelected;
      groupMemberContUrg.push(obsContUrgObsRequestPays);
    }

    if (this.departConUrgSelected !== "") {
      let obsContUrgObsRequestDepart: ObsRequest = new ObsRequest();
      obsContUrgObsRequestDepart.person = "";
      obsContUrgObsRequestDepart.concept = "165197AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestDepart.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestDepart.value = this.departConUrgSelected;
      groupMemberContUrg.push(obsContUrgObsRequestDepart);
    }

    if (this.commConUrgSelected !== "") {
      let obsContUrgObsRequestComm: ObsRequest = new ObsRequest();
      obsContUrgObsRequestComm.person = "";
      obsContUrgObsRequestComm.concept = "1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestComm.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestComm.value = this.commConUrgSelected;
      groupMemberContUrg.push(obsContUrgObsRequestComm);
    }


    if (this.contactUrgence.value.adresseConUrg !== "") {
      let obsContUrgObsRequestAddre: ObsRequest = new ObsRequest();
      obsContUrgObsRequestAddre.person = "";
      obsContUrgObsRequestAddre.concept = "165195AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsContUrgObsRequestAddre.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsContUrgObsRequestAddre.value = this.contactUrgence.value.adresseConUrg;
      groupMemberContUrg.push(obsContUrgObsRequestAddre);
    }


    if (groupMemberContUrg.length > 0) {
      obsContUrgGroupRequest.groupMembers = groupMemberContUrg;
      obs.push(obsContUrgGroupRequest);
    }


    // END CONTACT EN CAS D'URGENCE


    // START PREMIERE PERSONNE RESPONSABLES

    let obsPreGroupRequest: ObsGroupRequest = new ObsGroupRequest();
    obsPreGroupRequest.person = "";
    obsPreGroupRequest.concept = "165212AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsPreGroupRequest.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;


    let groupMemberPre: ObsRequest[] = [];


    if (this.LienPre2selected !== "") {
      let obsPreObsRequestLien: ObsRequest = new ObsRequest();
      obsPreObsRequestLien.person = "";
      obsPreObsRequestLien.concept = "164352AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestLien.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestLien.value = this.premPersResponsables.value.lienParentPre;
      groupMemberPre.push(obsPreObsRequestLien);
    }

    if (this.premPersResponsables.value.nomPrenomLienPre !== "") {
      let obsPreObsRequestNomPrenom: ObsRequest = new ObsRequest();
      obsPreObsRequestNomPrenom.person = "";
      obsPreObsRequestNomPrenom.concept = "163258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestNomPrenom.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestNomPrenom.value = this.premPersResponsables.value.nomPrenomLienPre;
      groupMemberPre.push(obsPreObsRequestNomPrenom);
    }


    if (this.premPersResponsables.value.telephonePre !== "") {
      let obsPreObsRequestPhone: ObsRequest = new ObsRequest();
      obsPreObsRequestPhone.person = "";
      obsPreObsRequestPhone.concept = "159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestPhone.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestPhone.value = this.premPersResponsables.value.telephonePre;
      groupMemberPre.push(obsPreObsRequestPhone);
    }

    if (this.paysPreSelected !== "") {
      let obsPreObsRequestPays: ObsRequest = new ObsRequest();
      obsPreObsRequestPays.person = "";
      obsPreObsRequestPays.concept = "165198AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestPays.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestPays.value = this.paysPreSelected;
      groupMemberPre.push(obsPreObsRequestPays);
    }

    if (this.departPreSelected !== "") {
      let obsPreObsRequestDepart: ObsRequest = new ObsRequest();
      obsPreObsRequestDepart.person = "";
      obsPreObsRequestDepart.concept = "165197AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestDepart.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestDepart.value = this.departPreSelected;
      groupMemberPre.push(obsPreObsRequestDepart);
    }

    if (this.commPreSelected !== "") {
      let obsPreObsRequestComm: ObsRequest = new ObsRequest();
      obsPreObsRequestComm.person = "";
      obsPreObsRequestComm.concept = "1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestComm.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestComm.value = this.commPreSelected;
      groupMemberPre.push(obsPreObsRequestComm);
    }


    if (this.premPersResponsables.value.adressePre !== "") {
      let obsPreObsRequestAddre: ObsRequest = new ObsRequest();
      obsPreObsRequestAddre.person = "";
      obsPreObsRequestAddre.concept = "165195AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsPreObsRequestAddre.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsPreObsRequestAddre.value = this.premPersResponsables.value.adressePre;
      groupMemberPre.push(obsPreObsRequestAddre);
    }


    if (groupMemberPre.length > 0) {
      obsPreGroupRequest.groupMembers = groupMemberPre;
      obs.push(obsPreGroupRequest);
    }


    // END PREMIERE PERSONNE RESPONSABLES


    // START DEUXIEME PERSONNE RESPONSABLES

    let obsDeuGroupRequest: ObsGroupRequest = new ObsGroupRequest();
    obsDeuGroupRequest.person = "";
    obsDeuGroupRequest.concept = "165213AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    obsDeuGroupRequest.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;


    let groupMemberDeu: ObsRequest[] = [];

    if (this.LienDeu2selected !== "") {
      let obsDeuObsRequestLien: ObsRequest = new ObsRequest();
      obsDeuObsRequestLien.person = "";
      obsDeuObsRequestLien.concept = "164352AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestLien.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestLien.value = this.deuxPersResponsables.value.lienParentDeu;
      groupMemberDeu.push(obsDeuObsRequestLien);
    }

    if (this.deuxPersResponsables.value.nomPrenomLienDeu !== "") {
      let obsDeuObsRequestNomPrenom: ObsRequest = new ObsRequest();
      obsDeuObsRequestNomPrenom.person = "";
      obsDeuObsRequestNomPrenom.concept = "163258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestNomPrenom.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestNomPrenom.value = this.deuxPersResponsables.value.nomPrenomLienDeu;
      groupMemberDeu.push(obsDeuObsRequestNomPrenom);
    }


    if (this.deuxPersResponsables.value.telephoneDeu !== "") {
      let obsDeuObsRequestPhone: ObsRequest = new ObsRequest();
      obsDeuObsRequestPhone.person = "";
      obsDeuObsRequestPhone.concept = "159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestPhone.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestPhone.value = this.deuxPersResponsables.value.telephoneDeu;
      groupMemberDeu.push(obsDeuObsRequestPhone);
    }


    if (this.paysDeuSelected !== "") {
      let obsDeuObsRequestPays: ObsRequest = new ObsRequest();
      obsDeuObsRequestPays.person = "";
      obsDeuObsRequestPays.concept = "165198AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestPays.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestPays.value = this.paysDeuSelected;
      groupMemberDeu.push(obsDeuObsRequestPays);
    }

    if (this.departDeuSelected !== "") {
      let obsDeuObsRequestDepart: ObsRequest = new ObsRequest();
      obsDeuObsRequestDepart.person = "";
      obsDeuObsRequestDepart.concept = "165197AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestDepart.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestDepart.value = this.departDeuSelected;
      groupMemberDeu.push(obsDeuObsRequestDepart);
    }

    if (this.commDeuSelected !== "") {
      let obsDeuObsRequestComm: ObsRequest = new ObsRequest();
      obsDeuObsRequestComm.person = "";
      obsDeuObsRequestComm.concept = "1354AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestComm.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestComm.value = this.commDeuSelected;
      groupMemberDeu.push(obsDeuObsRequestComm);
    }


    if (this.deuxPersResponsables.value.adresseDeu !== "") {
      let obsDeuObsRequestAddre: ObsRequest = new ObsRequest();
      obsDeuObsRequestAddre.person = "";
      obsDeuObsRequestAddre.concept = "165195AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      obsDeuObsRequestAddre.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
      obsDeuObsRequestAddre.value = this.deuxPersResponsables.value.adresseDeu;
      groupMemberDeu.push(obsDeuObsRequestAddre);
    }


    if (groupMemberDeu.length > 0) {
      obsDeuGroupRequest.groupMembers = groupMemberDeu;
      obs.push(obsDeuGroupRequest);
    }


    // END DEUXIEME PERSONNE RESPONSABLES


    this.addEncounter.obs = obs;

    console.log(this.addEncounter);


    if (this.dateEnregistrement.valid) {

      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
      });

      loading.present();

      this.api.postPatient(this.addEncounter)
          .subscribe({
            next: (res) => {
              //alert("Save successfully")
              const resultSavePatient = res;
              console.log(resultSavePatient);

              let navigationExtras: NavigationExtras = {
                state: resultSavePatient.patient.uuid
              };

              console.log(navigationExtras)

              sessionStorage.setItem('searchPatientUuid', JSON.stringify(navigationExtras));

              window.close();
              this.router.navigateByUrl('/home/dashPatient').then(() => {
                window.location.reload();
              })


            },
            error: (err) => {
              //alert("Error save")
            }
          })
    }


  }

  selectedcommNais(event: MatSelectChange) {

    this.commLieuNaisSelected = event.source.triggerValue;

  }

  selectedCommInf(event: MatSelectChange) {
    this.commInfConSelected = event.source.triggerValue;
  }

  selectedCommCon(event: MatSelectChange) {
    this.commConUrgSelected = event.source.triggerValue;
  }

  selectedCommPre(event: MatSelectChange) {
    this.commPreSelected = event.source.triggerValue;
  }

  selectedCommDeu(event: MatSelectChange) {
    this.commDeuSelected = event.source.triggerValue;
  }



  selectedSexe2(event: MatSelectChange) {

    this.sexeSelected = event.source.triggerValue;

  }

  selectedStatut(event: MatSelectChange) {

    this.statutMaritalSelected = event.source.triggerValue;
  }

  selectedProf(event: MatSelectChange) {
    this.professionSelected = event.source.triggerValue;
  }

  selectedReli(event: MatSelectChange) {
    this.religionSelected = event.source.triggerValue;
  }

  selectedLienConUrg(event: MatSelectChange) {
    this.LienConUrgselected = event.source.triggerValue;

  }

  selectedLienPre2(event: MatSelectChange) {
    this.LienPre2selected = event.source.triggerValue;

  }

  selectedLienDeu2(event: MatSelectChange) {
    this.LienDeu2selected = event.source.triggerValue;
  }

  showAllLieuNais() {
    this.dataServices.getAll().subscribe((data: any) => {
      (this.countriesLieuNais = data), console.log(this.countriesLieuNais);
    });
  }

  onSelectLieuNais(country_id: MatSelectChange) {

    this.dataServices.getAll().subscribe((res: any) => {
      (this.statesLieuNais = res["states"].filter(
        (res: any) => res.country_id == country_id!.value
      )),
        console.log(this.statesLieuNais);
    });
    //this.selectedMatJob =  (country_id.source.selected as MatOption).viewValue;
    if (country_id.source != undefined)
      this.paysLieuNaisSelected = country_id.source.triggerValue;

    console.log(this.paysLieuNaisSelected);

    //console.log(country_id);



  }

  onSelect2LieuNais(state_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.municipalitiesLieuNais = res["municipalities"].filter(
        (res: any) => res.state_id == state_id!.value
      )),
        console.log(this.municipalitiesLieuNais);
    });
    if (state_id.source != undefined)
      this.departLieuNaisSelected = state_id.source.triggerValue;

    console.log(this.departLieuNaisSelected);


  }

  showAllInfCont() {
    this.dataServices.getAll().subscribe((data: any) => {
      (this.countriesInfCont = data), console.log(this.countriesInfCont);
    });
  }

  onSelectInfCont(country_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.statesInfCont = res["states"].filter(
        (res: any) => res.country_id == country_id!.value
      )),
        console.log(this.statesInfCont);
    });
    if (country_id.source != undefined)
      this.paysInfContSelected = country_id.source.triggerValue;
  }

  onSelect2InfCont(state_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.municipalitiesInfCont = res["municipalities"].filter(
        (res: any) => res.state_id == state_id!.value
      )),
        console.log(this.municipalitiesInfCont);
    });

    if (state_id.source != undefined)
      this.departInfContSelected = state_id.source.triggerValue;
  }

  showAllConUrg() {
    this.dataServices.getAll().subscribe((data: any) => {
      (this.countriesConUrg = data), console.log(this.countriesConUrg);
    });
  }

  onSelectConUrg(country_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.statesConUrg = res["states"].filter(
        (res: any) => res.country_id == country_id!.value
      )),
        console.log(this.statesConUrg);
    });

    if (country_id.source != undefined)
      this.paysConUrgSelected = country_id.source.triggerValue;

  }

  onSelect2ConUrg(state_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.municipalitiesConUrg = res["municipalities"].filter(
        (res: any) => res.state_id == state_id!.value
      )),
        console.log(this.municipalitiesConUrg);
    });
    if (state_id.source != undefined)
      this.departConUrgSelected = state_id.source.triggerValue;
  }

  showAllPrePer() {
    this.dataServices.getAll().subscribe((data: any) => {
      (this.countriesPrePer = data), console.log(this.countriesPrePer);
    });
  }

  onSelectPrePer(country_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.statesPrePer = res["states"].filter(
        (res: any) => res.country_id == country_id!.value
      )),
        console.log(this.statesPrePer);
    });
    if (country_id.source != undefined)
      this.paysPreSelected = country_id.source.triggerValue;
  }

  onSelect2PrePer(state_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.municipalitiesPrePer = res["municipalities"].filter(
        (res: any) => res.state_id == state_id!.value
      )),
        console.log(this.municipalitiesPrePer);
    });
    if (state_id.source != undefined)
      this.departPreSelected = state_id.source.triggerValue;
  }

  showAllDeuPer() {
    this.dataServices.getAll().subscribe((data: any) => {
      (this.countriesDeuPer = data), console.log(this.countriesDeuPer);
    });
  }

  onSelectDeuPer(country_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.statesDeuPer = res["states"].filter(
        (res: any) => res.country_id == country_id!.value
      )),
        console.log(this.statesDeuPer);
    });
    if (country_id.source != undefined)
      this.paysDeuSelected = country_id.source.triggerValue;

  }

  onSelect2DeuPer(state_id: MatSelectChange) {
    this.dataServices.getAll().subscribe((res: any) => {
      (this.municipalitiesDeuPer = res["municipalities"].filter(
        (res: any) => res.state_id == state_id!.value
      )),
        console.log(this.municipalitiesDeuPer);
    });
    if (state_id.source != undefined)
      this.departDeuSelected = state_id.source.triggerValue;
  }

  // comparer(o1: any, o2: any): boolean {
  //   // if possible compare by object's name, and not by reference.
  //   return o1 && o2 ? o1.label === o2.label : o2 === o2;
  // }

}
