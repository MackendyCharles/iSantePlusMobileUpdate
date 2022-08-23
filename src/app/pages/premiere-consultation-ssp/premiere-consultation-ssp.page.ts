import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {AddEncounterSspPreCons} from "../../interfaces/addEncounter";
import {TokenStorageService} from "../../services/tokenStorage.service";
import {AppConstant} from "../../common/app-constant";
import {EncounterProviderExport} from "../../models/encounterProvider";
import {ObsGroupRequest, ObsGroupRequestValueNumber, ObsRequest} from "../../models/obs";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-premiere-consultation-ssp',
  templateUrl: './premiere-consultation-ssp.page.html',
  styleUrls: ['./premiere-consultation-ssp.page.scss'],
})
export class PremiereConsultationSSPPage implements OnInit {

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  panelOpenState = false;
  dataSourcePatient: any
  patientUuid : string;
  patientName : string;
  pageName: string;
  dataSource: any;

  agePatient: string;
  sexePatient: string;

  step = 0;
  maxDate: any;

  dateEnregistrement: FormGroup;
  informationGenerales: FormGroup;
  herodoCollateraux: FormGroup;
  personnelsHabitubes: FormGroup;
  signesVitauxAnthropometrie: FormGroup;
  motifConsultation: FormGroup;
  vaccination: FormGroup;
  examenPhysique: FormGroup;
  impressonsCliniqueDiagnostiques: FormGroup;
  turberclose: FormGroup;
  surveillanceTraitement: FormGroup;

  patientUUID: string;
  dataVisit;

  private addEncounterSspPreCons : AddEncounterSspPreCons;





  date = new FormControl(new Date());

  setStep(index: number) {
    this.step = index;
  }

  isShown: boolean = false ; // hidden by default


  filarioseLymphatiqueICD() {

  this.isShown = ! this.isShown;

  }

  constructor(private api : ApiService, public router: Router,  private _formBuilder: FormBuilder,private token: TokenStorageService) { }

  ngOnInit() {
    this.loadPatient();
      this.patientUUID = JSON.parse(sessionStorage.getItem('searchPatientUuid'));
      this.dataVisit= JSON.parse(sessionStorage.getItem('detailVisit'));

      console.log("info:::::",this.dataVisit)

      this.token.getUser();
      console.log(this.token.getUser().uuid);
   // this.loadVisit();
   this.maxDate = new Date();
   this.dateEnregistrement = this._formBuilder.group({
     dateEnCtrl: this.date,
   });

   this.informationGenerales = this._formBuilder.group({
     agePatient: "",
     sexePatient: "",
     groupeSanguin: "",
     electroHemoglobine: "",
     preciser: "",
     depistageCAP: "",
     depistageCAC: "",
     pickerDateCAP: this.date,
     pickerDateCAC: this.date,
     resultats: "",
    });

    this.herodoCollateraux = this._formBuilder.group({
     anteAucune: "",
     antiInconnu: "",
     asthme: "",
     cancer: "",
     preciserCancer: "",
     cardiopathie: "",
     tuberculose: "",
     diabete: "",
     epilepsie : "",
     hta: "" ,
     mdrtb: "",
     autres: ""
   });

   this.personnelsHabitubes = this._formBuilder.group({
    anteAucunePershab: "",
    antiInconnuPershab: "",
    accidentCerebroVas: "",
    allergiesPersHab: "",
    preciserAllerPersHab: "",
    asthmePersHab: "",
    cancerPersHab: "",
    preciserCancerPersHab: "",
    cardiopathiePersHab: "",
    chirugiePersHab: "",
    preciserChiruPersHab: "",
    traumaPersHab: "",
    preciserTraumaPersHab: "",
    duabetePersHab: "",
    diphteriePersHab: "",
    epilepsiePersHab: "",
    grossessePersHab: "",
    hemoglobinopathiePersHab: "",
    preciserHemogPersHab: "",
    htaPersHab: "",
    hyperchoesterolemiePersHab: "",
    istPersHab: "",
    preciserIstPersHab: "",
    malnutritionPersHab: "",
    pertePoidspersHab: "",
    tuberculosePersHab: "",
    mdrTbPersHab: "",
    troublesPsychPersHab: "",
    preciserTrouPsyPersHab: "",
    alcoolPersHab: "",
    droguePersHab: "",
    preciserDroPersHab:"",
    tabacPersHab: "",
    autrePersHab: "",
    preciserAutrePersHab: "",
    medicamentsActPersHab: "",
    textMedicaPersHab: "",
    remarquePersHab: "",
   });

   this.signesVitauxAnthropometrie = this._formBuilder.group({
    pds: "",
    temp: "",
    taille: "",
    pouls: "",
    ta1: "",
    ta2: "",
    fr: "",
    nomPrenomPrest: "",
   });

   this.motifConsultation = this._formBuilder.group({
    adenopathieMC: "",
    oedemeMC: "",
    preciserOedemeMC: "",
    douleursMC: "",
    preciserDouleursMC: "",
    fievreM2SMC: "",
    fievreP2SMC: "",
    pertePoidsMC: "",
    sueursProfusesMC: "",
    agressionAuInfliMC: "",
    agressionSexuelleMC: "",
    agressionSexuelleHeureMC: "",
    accidentVoiePubliqueMC: "",
    brulureMC: "",
    preciserBrulureMC: "",
    fractureOsseuseMC: "",
    plaieMC: "",
    preciserPlaieMC: "",
    armeFeuMC: "",
    armeBlancheMC: "",
    autresArmeMC: "",
    autresArmeTextMC: "",
    traumaCranienMC: "",
    ecoulementNasalMC: "",
    epistaxisMC: "",
    oeilRougeMC: "",
    otalgieMC: "",
    otorrheeMC: "",
    brulurersMictionnellesMC: "",
    douleurHypogastriqueMC: "",
    dysurieMC: "",
    ecoulementUrethralMC: "",
    hematurieMC: "",
    hemorragieVaginaleMC: "",
    pertesVaginalesMC: "",
    pollakiurieMC: "",
    polyurieMC: "",
    pruritVulvaireMC: "",
    ulcerationsMC: "",
    retardReglesMC: "",
    troublesmentauxMC: "",
    preciserTroublesMentauxMC: "",
    aphasieMC: "",
    boiterieSteppageMC: "",
    cephaleeMauxTeteMC: "",
    convulsionsMC: "",
    hemiplegieMC: "",
    paralysieFlasqueMC: "",
    paraplegieMC: "",
    syncopeMC: "",
    vertigesMC: "",
    douleursPrecordialesMC: "",
    douleursThoraciquesMC: "",
    dyspneeMC: "",
    hemoptysieMC: "",
    palpitationsMC: "",
    touxM2SMC: "",
    touxP2SMC: "",
    eruptionsCutaneesMC: "",
    preciserEruptionsCutaneesMC: "",
    pruritMC: "",
    constipaionMC: "",
    diarrheeM2SMC: "",
    diarrheeP2SMC: "",
    douleursAbdominalesMC: "",
    dysphagieMC: "",
    hematemeseMC: "",
    ictereJaunisseMC: "",
    inappetenceAnorexieMC: "",
    melenaMC : "",
    nauseeMC: "",
    pyrosisMC: "",
    vomissementMC: "",
    autres1MC: "",
    autres2MC: "",
    remarqueMC: "",
     });

   this.vaccination = this._formBuilder.group({
      dose1HepatiteBVAC: "",
      dose2HepatiteBVAC: "",
      dose3HepatiteBVAC: "",
      dose0PolioVAC: "",
      dose1PolioVAC: "",
      dose2PolioVAC: "",
      dose3PolioVAC: "",
      dose4PolioVAC:  "",
      dose1DiTePerVAC: "",
      dose2DiTePerVAC: "",
      dose3DiTePerVAC: "",
      dose4DiTePerVAC: "",
      dose1HIBVAC: "",
      dose2HIBVAC: "",
      dose3HIBVAC: "",
      dose4HIBVAC: "",
      dose1PentavalentVAC: "",
      dose2PentavalentVAC: "",
      dose3PentavalentVAC: "",
      dose1PneumociqueVAC: "",
      dose2PneumociqueVAC: "",
      dose3PneumociqueVAC: "",
      dose1RotavirusVAC: "",
      dose2RotavirusVAC: "",
      dose1RORVAC: "",
      dose2RORVAC: "",
      dose1RRVAC: "",
      dose1DTVAC: "",
      dose2DTVAC: "",
      dose1VaricelleVAC: "",
      dose1TyphimviVAC: "",
      dose2TyphimviVAC: "",
      dose1meningoACVAC: "",
      dose2meningoACVAC: "",
      dose1HematitAVAC: "",
      dose2HematitAVAC: "",
      dose1CholeraVAC: "",
      dose2CholeraVAC: "",
      dose3CholeraVAC: "",
      dose1BCGVAC: "",
      dose1HPVVAC: "",
      dose1DiphterieTetanosVAC: "",
      dose2DiphterieTetanosVAC: "",
      dose1OxfordAstrazenecaVAC: "",
      dose2OxfordAstrazenecaVAC: "",
      dose3OxfordAstrazenecaVAC: "",
      dose4OxfordAstrazenecaVAC: "",
      dose1ModernaVAC: "",
      dose2ModernaVAC: "",
      dose3ModernaVAC: "",
      dose4ModernaVAC: "",
      dose1PfizerBioNTechVAC: "",
      dose2PfizerBioNTechVAC: "",
      dose3PfizerBioNTechVAC: "",
      dose4PfizerBioNTechVAC: "",
      dose1GamaleyaSputRusVAC: "",
      dose2GamaleyaSputRusVAC: "",
      dose3GamaleyaSputRusVAC: "",
      dose4GamaleyaSputRusVAC: "",
      dose1SinovacSinopharmVAC: "",
      dose2SinovacSinopharmVAC: "",
      dose3SinovacSinopharmVAC: "",
      dose4SinovacSinopharmVAC: "",
      dose1JohnsonVAC: "",
      dose2JohnsonVAC: "",
      dose3JohnsonVAC: "",
      dose4JohnsonVAC: "",

      


     });

   this.examenPhysique = this._formBuilder.group({
    tete: "",
    yeux: "",
    nez: "",
    boucheOrale: "",
    oreilles: "",
    cou: "",
    coeur: "",
    poumons: "",
    abdomen: "",
    organesGenitaux: "",
    toucherRectal: "",
    membres: "",
    peau: "",
    ExamenNeurologique: "",
    cervicale: "",
    supraclaviculaire: "",
    axillaire: "",
    inguinale: "",

   });

   this.impressonsCliniqueDiagnostiques = this._formBuilder.group({
    accidentCereVasICD: "",
    anemieICD: "",
    preciserAnemieICD: "",
    asthmeICD: "",
    cardiopathieICD: "",
    diabeteType1ICD: "",
    diabeteType2ICD: "",
    diarrheeAigAqueuICD: "",
    diarrheeAigSangICD: "",
    drepanocytoseSSSCICD: "",
    epilepsieICD: "",
    fievreCauseIndICD: "",
    grossessICD: "",
    hypertensionArterielle: "",
    malnutritionPertePoidsICD: "",
    urgenceChirurgicaleICD: "",
    esaviICD: "",
    microcephalieCongeICD: "",
    syndromeGuilBarreICD: "",
    decesMaternelICD: "",
    preciserdecesMaternelICD: "",
    amygdaliteICD: "",
    charbonICD: "",
    precisercharbonICD: "",
    choleraICD: "",
    conjonctiviteICD: "",
    preciserConjonctiviteICD: "",
    coquelucheICD: "",
    dengueICD: "",
    preciserDengueICD: "",
    diphterieICD: "",
    fievreHemorraigiqueAigICD: "",
    fievreTyphoideICD: "",
    filarioseLymphatiqueICD: "",
    galeICD: "",
    infectionRespiratoireICD: "",

   });

   this.turberclose = this._formBuilder.group({
    nouveauDiagSuiTUR: "",
    numbEnregisTBTUR: "",
    pickerDateEnrTUR: "",
    etablissementTUR: "",
    typeMaladeTUR: "",
    clasificationMaladieTUR: "",
    marquerCiDessousTUR: "",
    autreMarquerTUR: "",
    diagnosticBaseTUR: "",
    pickerDateDebutTraitementTUR: "",
    regimePosologiePreTUR: "",
    casContactTUR: "",
    nombreContactTUR: "",
    numbReferenceIndexTUR: "",
    accompagnateurTUR: "",
    nomPrenomAccomTUR: "",
    statutVIHTUR: "",
    pickerDateStatusVIHTUR: "",
    EnroleTUR: "",
    CD4TUR: "",
    pickerDateEnrolleeSoinsTUR: "",
    ARVTUR: "",
    medicamentsTUR: "",
    pickerDateDebutARVTUR: "",
    prophylaxieINHTUR: "",
    suplementationVitBTUR: "",
    suplementationVitBTextTUR: "",
    
   });

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

              console.log(this.dataSourcePatient)
            this.patientName =  this.dataSourcePatient.person.display;
            this.agePatient = this.dataSourcePatient.person.age;
            this.sexePatient = this.dataSourcePatient.person.gender;

            console.log(this.dataSourcePatient)



          });

      // console.log(this.dataSource.patient.links[0].uri);


    }
  }

    AddSspPreCons(){

        console.log(this.dateEnregistrement.value.dateEnCtrl);
        this.token.getUser();
        console.log(this.token.getUser().uuid);

        this.addEncounterSspPreCons = new AddEncounterSspPreCons();
        this.addEncounterSspPreCons.encounterDatetime = this.dateEnregistrement.value.dateEnCtrl;
        this.addEncounterSspPreCons.patient = this.dataVisit.patient.uuid;
        this.addEncounterSspPreCons.encounterType = "17536ba6-dd7c-4f58-8014-08c7cb798ac7";
        this.addEncounterSspPreCons.location = AppConstant.LOCAION_UUID;

        let encounterProviderExports: EncounterProviderExport[] = [];

        let encounterProviderExport: EncounterProviderExport = new EncounterProviderExport();
        encounterProviderExport.provider = this.token.getUser().provider;
        encounterProviderExport.encounterRole = "ef0445e7-bfe6-4260-a351-09fc835b6bcd";

        encounterProviderExports.push(encounterProviderExport);
        this.addEncounterSspPreCons.encounterProviders = encounterProviderExports;

        this.addEncounterSspPreCons.visit = this.dataVisit.uuid;


        //---------OBS -------//////

        let obs: ObsGroupRequestValueNumber[] = [];

        if(this.informationGenerales.value.groupeSanguin !== ""){
            let obsGroupeSanguin: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsGroupeSanguin.concept = "300AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeSanguin.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeSanguin.person = this.dataVisit.patient.uuid;
            obsGroupeSanguin.value = this.informationGenerales.value.groupeSanguin;
            obs.push(obsGroupeSanguin);
        }

        if(this.informationGenerales.value.electroHemoglobine !== ""){
            let obsElectroHemoglobine: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsElectroHemoglobine.concept = "161421AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsElectroHemoglobine.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsElectroHemoglobine.person = this.dataVisit.patient.uuid;
            if(this.informationGenerales.value.electroHemoglobine == "Autre"){
                obsElectroHemoglobine.value = this.informationGenerales.value.preciserElectr;
            }
            obsElectroHemoglobine.value = this.informationGenerales.value.electroHemoglobine;
            obs.push(obsElectroHemoglobine);
        }

        //---------ObsGroupe   DepistageCAC

        let obsSspPreConsDepistageCAC: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsDepistageCAC.concept = "88b3061c-c93c-4ca2-84b7-51c64c77a8e5";
        obsSspPreConsDepistageCAC.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;;
        obsSspPreConsDepistageCAC.person = this.dataVisit.patient.uuid;

        let groupMembreSspDepisCAC: ObsRequest[] = [];
        if(this.informationGenerales.value.depistageCAC !== ""){
            let obsGroupeDepistageCAC: ObsRequest = new ObsRequest();
            obsGroupeDepistageCAC.concept = "1651AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeDepistageCAC.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeDepistageCAC.person = this.dataVisit.patient.uuid;
            if(this.informationGenerales.value.depistageCAC){
                obsGroupeDepistageCAC.value = "151185AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }

            groupMembreSspDepisCAC.push(obsGroupeDepistageCAC);
        }

        if(this.informationGenerales.value.pickerDateCAC !== ""){
            let obsGroupePickerDateCAC: ObsRequest = new ObsRequest();
            obsGroupePickerDateCAC.concept = "160715AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePickerDateCAC.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePickerDateCAC.person = this.dataVisit.patient.uuid;

            let newDateTimePickerCAC = formatDate(this.informationGenerales.value.pickerDateCAC,  'yyyy-MM-dd HH:mm:ss', 'en-US');
            obsGroupePickerDateCAC.value =  newDateTimePickerCAC;
            groupMembreSspDepisCAC.push(obsGroupePickerDateCAC);
        }

        if(groupMembreSspDepisCAC.length > 0){
            obsSspPreConsDepistageCAC.groupMembers = groupMembreSspDepisCAC;
            obs.push(obsSspPreConsDepistageCAC);
        }



//---------- ObsGroupe   DepistageCAP

        let obsSspPreConsDepistageCAP: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsDepistageCAP.concept = "f2521e56-6922-40f7-85c1-70541a8305d9";
        obsSspPreConsDepistageCAP.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;;
        obsSspPreConsDepistageCAP.person = this.dataVisit.patient.uuid;

        let groupMembreSspDepisCAP: ObsRequest[] = [];
        if(this.informationGenerales.value.depistageCAP !== ""){
            let obsGroupeDepistageCAP: ObsRequest = new ObsRequest();
            obsGroupeDepistageCAP.concept = "1651AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeDepistageCAP.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeDepistageCAP.person = this.dataVisit.patient.uuid;
            if(this.informationGenerales.value.depistageCAP){
                obsGroupeDepistageCAP.value = "163464AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }

            groupMembreSspDepisCAP.push(obsGroupeDepistageCAP);
        }

        if(this.informationGenerales.value.pickerDateCAP !== ""){
            let obsGroupePickerDateCAP: ObsRequest = new ObsRequest();
            obsGroupePickerDateCAP.concept = "160715AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePickerDateCAP.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePickerDateCAP.person = this.dataVisit.patient.uuid;

            let newDateTimePickerCAP = formatDate(this.informationGenerales.value.pickerDateCAP,  'yyyy-MM-dd HH:mm:ss', 'en-US');
            obsGroupePickerDateCAP.value = newDateTimePickerCAP
            groupMembreSspDepisCAP.push(obsGroupePickerDateCAP);
        }

        if(groupMembreSspDepisCAP.length > 0){
            obsSspPreConsDepistageCAP.groupMembers = groupMembreSspDepisCAP;
            obs.push(obsSspPreConsDepistageCAP);
        }



        let obsSspPreConsResultas: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsResultas.concept = "160714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsSspPreConsResultas.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;;
        obsSspPreConsResultas.person = this.dataVisit.patient.uuid;

        let groupMembreSspResultas: ObsRequest[] = [];
        if(this.informationGenerales.value.resultats !== ""){
            let obsGroupeResultats: ObsRequest = new ObsRequest();
            obsGroupeResultats.concept = "160716AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeResultats.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeResultats.person = this.dataVisit.patient.uuid;
            obsGroupeResultats.value = this.informationGenerales.value.resultats;
            groupMembreSspResultas.push(obsGroupeResultats);
        }

        if(this.herodoCollateraux.value.anteAucune !== ""){
            let obsGroupeAnteAucune: ObsRequest = new ObsRequest();
            obsGroupeAnteAucune.concept = "163607AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeAnteAucune.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeAnteAucune.person = this.dataVisit.patient.uuid;
            if(this.herodoCollateraux.value.anteAucune == true){
                obsGroupeAnteAucune.value = "163729AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }else {
                obsGroupeAnteAucune.value = "163728AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupMembreSspResultas.push(obsGroupeAnteAucune)
        }

        if(groupMembreSspResultas.length > 0){
            obsSspPreConsResultas.groupMembers = groupMembreSspResultas;
            obs.push(obsSspPreConsResultas);
        }

 //=================ANTECEDENTS HEREDO-COLLATERAUX============

        ///========ASTHME========================
        let obsSspPreConsAsthme: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsAsthme.concept = "50f7bb2d-09e2-4ac1-9679-f6f171bae7ae";
        obsSspPreConsAsthme.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsAsthme.person = this.dataVisit.patient.visit;


        let groupeSspAsthme: ObsRequest[] = [];
        if(this.herodoCollateraux.value.asthme !== ""){
            let obsGroupeAsthme: ObsRequest = new ObsRequest();
            obsGroupeAsthme.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeAsthme.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeAsthme.person = this.dataVisit.patient.uuid;
            obsGroupeAsthme.value = "140234AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspAsthme.push(obsGroupeAsthme);

            console.log(this.herodoCollateraux.value.asthme)

            for(let i = 0 ; i < this.herodoCollateraux.value.asthme.length; i ++){
                if(this.herodoCollateraux.value.asthme[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeAsthmeselect: ObsRequest = new ObsRequest();
                    obsGroupeAsthmeselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeAsthmeselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeAsthmeselect.person = this.dataVisit.patient.uuid;
                    obsGroupeAsthmeselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspAsthme.push(obsGroupeAsthmeselect);
                }
                if(this.herodoCollateraux.value.asthme[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeAsthmeselect: ObsRequest = new ObsRequest();
                    obsGroupeAsthmeselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeAsthmeselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeAsthmeselect.person = this.dataVisit.patient.uuid;
                    obsGroupeAsthmeselect.value = "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspAsthme.push(obsGroupeAsthmeselect);
                }
                if(this.herodoCollateraux.value.asthme[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeAsthmeselect: ObsRequest = new ObsRequest();
                    obsGroupeAsthmeselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeAsthmeselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeAsthmeselect.person = this.dataVisit.patient.uuid;
                    obsGroupeAsthmeselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspAsthme.push(obsGroupeAsthmeselect);
                }
            }


        }

        if(groupeSspAsthme.length > 0){
            obsSspPreConsAsthme.groupMembers = groupeSspAsthme;
            obs.push(obsSspPreConsAsthme);
        }

/////=========================CANCER==================================

        let obsSspPreConsCancer: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsCancer.concept = "2e3667fc-09e3-48f8-8aeb-9a02fac8b472";
        obsSspPreConsCancer.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsCancer.person = this.dataVisit.patient.visit;

        let groupeSspCancer: ObsRequest[] = [];
        if(this.herodoCollateraux.value.cancer !== ""){
            let obsGroupeCancer: ObsRequest = new ObsRequest();
            obsGroupeCancer.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeCancer.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeCancer.person = this.dataVisit.patient.uuid;
            obsGroupeCancer.value = "151521AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeCancer.comment = this.herodoCollateraux.value.preciserCancer;
            groupeSspCancer.push(obsGroupeCancer);

            for(let i = 0 ; i < this.herodoCollateraux.value.cancer.length; i ++){
                if(this.herodoCollateraux.value.cancer[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeCancerselect: ObsRequest = new ObsRequest();
                    obsGroupeCancerselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeCancerselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeCancerselect.person = this.dataVisit.patient.uuid;
                    obsGroupeCancerselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspCancer.push(obsGroupeCancerselect);
                }
                if(this.herodoCollateraux.value.cancer[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeCancerselect: ObsRequest = new ObsRequest();
                    obsGroupeCancerselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeCancerselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeCancerselect.person = this.dataVisit.patient.uuid;
                    obsGroupeCancerselect.value = "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspCancer.push(obsGroupeCancerselect);
                }
                if(this.herodoCollateraux.value.cancer[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeCancerselect: ObsRequest = new ObsRequest();
                    obsGroupeCancerselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeCancerselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeCancerselect.person = this.dataVisit.patient.uuid;
                    obsGroupeCancerselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspCancer.push(obsGroupeCancerselect);
                }
            }


        }

        if(groupeSspCancer.length > 0){
            obsSspPreConsCancer.groupMembers = groupeSspCancer;
            obs.push(obsSspPreConsCancer);
        }


////===========================Cardiopathie=======================
        let obsSspPreConsCardiopathie: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsCardiopathie.concept = "c168326c-31b6-4f99-8a7c-c5124336d673";
        obsSspPreConsCardiopathie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsCardiopathie.person = this.dataVisit.patient.visit;

        let groupeSspCardiopathie: ObsRequest[] = [];
        if(this.herodoCollateraux.value.cardiopathie !== ""){
            let obsGroupeCardiopathie: ObsRequest = new ObsRequest();
            obsGroupeCardiopathie.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeCardiopathie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeCardiopathie.person = this.dataVisit.patient.uuid;
            obsGroupeCardiopathie.value = "163114AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspCardiopathie.push(obsGroupeCardiopathie);

            for(let i = 0 ; i < this.herodoCollateraux.value.cardiopathie.length; i ++){
                if(this.herodoCollateraux.value.cardiopathie[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeCardiopathieselect: ObsRequest = new ObsRequest();
                    obsGroupeCardiopathieselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeCardiopathieselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeCardiopathieselect.person = this.dataVisit.patient.uuid;
                    obsGroupeCardiopathieselect.value =  "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspCardiopathie.push(obsGroupeCardiopathieselect);
                }
                if(this.herodoCollateraux.value.cardiopathie[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeCardiopathieselect: ObsRequest = new ObsRequest();
                    obsGroupeCardiopathieselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeCardiopathieselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeCardiopathieselect.person = this.dataVisit.patient.uuid;
                    obsGroupeCardiopathieselect.value =  "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspCardiopathie.push(obsGroupeCardiopathieselect);
                }
                if(this.herodoCollateraux.value.cardiopathie[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeCardiopathieselect: ObsRequest = new ObsRequest();
                    obsGroupeCardiopathieselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeCardiopathieselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeCardiopathieselect.person = this.dataVisit.patient.uuid;
                    obsGroupeCardiopathieselect.value =  "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspCardiopathie.push(obsGroupeCardiopathieselect);
                }
            }


        }

        if(groupeSspCardiopathie.length > 0){
            obsSspPreConsCardiopathie.groupMembers = groupeSspCardiopathie;
            obs.push(obsSspPreConsCardiopathie);
        }

////===========================Tuberculose=======================
        let obsSspPreConsTuberculose: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsTuberculose.concept = "160593AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsSspPreConsTuberculose.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsTuberculose.person = this.dataVisit.patient.visit;

        let groupeSspTuberculose: ObsRequest[] = [];
        if(this.herodoCollateraux.value.tuberculose !== ""){
            let obsGroupeTuberculose: ObsRequest = new ObsRequest();
            obsGroupeTuberculose.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeTuberculose.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeTuberculose.person = this.dataVisit.patient.uuid;
            obsGroupeTuberculose.value = "163114AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspTuberculose.push(obsGroupeTuberculose);

            for(let i = 0 ; i < this.herodoCollateraux.value.tuberculose.length; i ++){
                if(this.herodoCollateraux.value.tuberculose[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeTuberculoseselect: ObsRequest = new ObsRequest();
                    obsGroupeTuberculoseselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeTuberculoseselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeTuberculoseselect.person = this.dataVisit.patient.uuid;
                    obsGroupeTuberculoseselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspTuberculose.push(obsGroupeTuberculoseselect);
                }

                if(this.herodoCollateraux.value.tuberculose[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeTuberculoseselect: ObsRequest = new ObsRequest();
                    obsGroupeTuberculoseselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeTuberculoseselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeTuberculoseselect.person = this.dataVisit.patient.uuid;
                    obsGroupeTuberculoseselect.value =  "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspTuberculose.push(obsGroupeTuberculoseselect);
                }

                if(this.herodoCollateraux.value.tuberculose[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeTuberculoseselect: ObsRequest = new ObsRequest();
                    obsGroupeTuberculoseselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeTuberculoseselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeTuberculoseselect.person = this.dataVisit.patient.uuid;
                    obsGroupeTuberculoseselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspTuberculose.push(obsGroupeTuberculoseselect);
                }
            }


        }

        if(groupeSspTuberculose.length > 0){
            obsSspPreConsTuberculose.groupMembers = groupeSspTuberculose;
            obs.push(obsSspPreConsTuberculose);
        }


////===========================Diabète=======================
        let obsSspPreConsDiabete: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsDiabete.concept = "41bd1e8c-298f-4878-a094-369a298d64ab";
        obsSspPreConsDiabete.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsDiabete.person = this.dataVisit.patient.visit;

        let groupeSspDiabete: ObsRequest[] = [];
        if(this.herodoCollateraux.value.diabete !== ""){
            let obsGroupeDiabete: ObsRequest = new ObsRequest();
            obsGroupeDiabete.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeDiabete.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeDiabete.person = this.dataVisit.patient.uuid;
            obsGroupeDiabete.value = "140228AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspDiabete.push(obsGroupeDiabete);

            for(let i = 0 ; i < this.herodoCollateraux.value.diabete.length; i ++){
                if(this.herodoCollateraux.value.diabete[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeDiabeteselect: ObsRequest = new ObsRequest();
                    obsGroupeDiabeteselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeDiabeteselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeDiabeteselect.person = this.dataVisit.patient.uuid;
                    obsGroupeDiabeteselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspDiabete.push(obsGroupeDiabeteselect);
                }

                if(this.herodoCollateraux.value.diabete[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeDiabeteselect: ObsRequest = new ObsRequest();
                    obsGroupeDiabeteselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeDiabeteselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeDiabeteselect.person = this.dataVisit.patient.uuid;
                    obsGroupeDiabeteselect.value = "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspDiabete.push(obsGroupeDiabeteselect);
                }

                if(this.herodoCollateraux.value.diabete[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeDiabeteselect: ObsRequest = new ObsRequest();
                    obsGroupeDiabeteselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeDiabeteselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeDiabeteselect.person = this.dataVisit.patient.uuid;
                    obsGroupeDiabeteselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspDiabete.push(obsGroupeDiabeteselect);
                }
            }
        }



        if(groupeSspDiabete.length > 0){
            obsSspPreConsDiabete.groupMembers = groupeSspDiabete;
            obs.push(obsSspPreConsDiabete);
        }

////===========================Epilepsie=======================
        let obsSspPreConsEpilepsie: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsEpilepsie.concept = "fe686c52-a77b-4aee-8110-85d2897f6bd1";
        obsSspPreConsEpilepsie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsEpilepsie.person = this.dataVisit.patient.visit;

        let groupeSspEpilepsie: ObsRequest[] = [];
        if(this.herodoCollateraux.value.epilepsie !== ""){
            let obsGroupeEpilepsie: ObsRequest = new ObsRequest();
            obsGroupeEpilepsie.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeEpilepsie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeEpilepsie.person = this.dataVisit.patient.uuid;
            obsGroupeEpilepsie.value = "152450AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspEpilepsie.push(obsGroupeEpilepsie);

            for(let i = 0 ; i < this.herodoCollateraux.value.epilepsie.length; i ++){
                if(this.herodoCollateraux.value.epilepsie[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeEpilepsieselect: ObsRequest = new ObsRequest();
                    obsGroupeEpilepsieselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeEpilepsieselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeEpilepsieselect.person = this.dataVisit.patient.uuid;
                    obsGroupeEpilepsieselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspEpilepsie.push(obsGroupeEpilepsieselect);
                }

                if(this.herodoCollateraux.value.epilepsie[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeEpilepsieselect: ObsRequest = new ObsRequest();
                    obsGroupeEpilepsieselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeEpilepsieselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeEpilepsieselect.person = this.dataVisit.patient.uuid;
                    obsGroupeEpilepsieselect.value = "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspEpilepsie.push(obsGroupeEpilepsieselect);
                }

                if(this.herodoCollateraux.value.epilepsie[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
                    let obsGroupeEpilepsieselect: ObsRequest = new ObsRequest();
                    obsGroupeEpilepsieselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeEpilepsieselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeEpilepsieselect.person = this.dataVisit.patient.uuid;
                    obsGroupeEpilepsieselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspEpilepsie.push(obsGroupeEpilepsieselect);
                }
            }


        }

        if(groupeSspEpilepsie.length > 0){
            obsSspPreConsEpilepsie.groupMembers = groupeSspEpilepsie;
            obs.push(obsSspPreConsEpilepsie);
        }

////===========================HTA=======================
        let obsSspPreConsHTA: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsHTA.concept = "f0748bfb-1465-4d6c-89f1-c631f46c1510";
        obsSspPreConsHTA.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsHTA.person = this.dataVisit.patient.visit;

        let groupeSspHTA: ObsRequest[] = [];
        if(this.herodoCollateraux.value.hta !== ""){
            let obsGroupeHTA: ObsRequest = new ObsRequest();
            obsGroupeHTA.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeHTA.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeHTA.person = this.dataVisit.patient.uuid;
            obsGroupeHTA.value = "151927AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspHTA.push(obsGroupeHTA);

            for(let i = 0 ; i < this.herodoCollateraux.value.hta.length; i ++) {
                if (this.herodoCollateraux.value.hta[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                    let obsGroupeHTAselect: ObsRequest = new ObsRequest();
                    obsGroupeHTAselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeHTAselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeHTAselect.person = this.dataVisit.patient.uuid;
                    obsGroupeHTAselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspHTA.push(obsGroupeHTAselect);
                }

                if (this.herodoCollateraux.value.hta[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                    let obsGroupeHTAselect: ObsRequest = new ObsRequest();
                    obsGroupeHTAselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeHTAselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeHTAselect.person = this.dataVisit.patient.uuid;
                    obsGroupeHTAselect.value = "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspHTA.push(obsGroupeHTAselect);
                }

                if (this.herodoCollateraux.value.hta[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                    let obsGroupeHTAselect: ObsRequest = new ObsRequest();
                    obsGroupeHTAselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeHTAselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeHTAselect.person = this.dataVisit.patient.uuid;
                    obsGroupeHTAselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspHTA.push(obsGroupeHTAselect);
                }
            }


        }

        if(groupeSspHTA.length > 0){
            obsSspPreConsHTA.groupMembers = groupeSspHTA;
            obs.push(obsSspPreConsHTA);
        }


////===========================MDR TB=======================
        let obsSspPreConsMdrtb: ObsGroupRequest = new ObsGroupRequest();
        obsSspPreConsMdrtb.concept = "07766a1b-fe6c-444a-9b53-c1a381bcc771";
        obsSspPreConsMdrtb.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        obsSspPreConsMdrtb.person = this.dataVisit.patient.visit;

        let groupeSspMdrtb: ObsRequest[] = [];
        if(this.herodoCollateraux.value.mdrtb !== ""){
            let obsGroupeMdrtb: ObsRequest = new ObsRequest();
            obsGroupeMdrtb.concept = "160592AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeMdrtb.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeMdrtb.person = this.dataVisit.patient.uuid;
            obsGroupeMdrtb.value = "164102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            groupeSspMdrtb.push(obsGroupeMdrtb);

            for(let i = 0 ; i < this.herodoCollateraux.value.mdrtb.length; i ++) {
                if (this.herodoCollateraux.value.mdrtb[i] == "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                    let obsGroupeMdrtbselect: ObsRequest = new ObsRequest();
                    obsGroupeMdrtbselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeMdrtbselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeMdrtbselect.person = this.dataVisit.patient.uuid;
                    obsGroupeMdrtbselect.value = "970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspMdrtb.push(obsGroupeMdrtbselect);
                }

                if (this.herodoCollateraux.value.mdrtb[i] == "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                    let obsGroupeMdrtbselect: ObsRequest = new ObsRequest();
                    obsGroupeMdrtbselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeMdrtbselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeMdrtbselect.person = this.dataVisit.patient.uuid;
                    obsGroupeMdrtbselect.value = "971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspMdrtb.push(obsGroupeMdrtbselect);
                }

                if (this.herodoCollateraux.value.mdrtb[i] == "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                    let obsGroupeMdrtbselect: ObsRequest = new ObsRequest();
                    obsGroupeMdrtbselect.concept = "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    obsGroupeMdrtbselect.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
                    obsGroupeMdrtbselect.person = this.dataVisit.patient.uuid;
                    obsGroupeMdrtbselect.value = "972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                    groupeSspMdrtb.push(obsGroupeMdrtbselect);
                }
            }


        }

        if(this.herodoCollateraux.value.autres !== ""){
            let obsGroupeAutres: ObsRequest = new ObsRequest();
            obsGroupeAutres.concept = "162148AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupeAutres.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupeAutres.person = this.dataVisit.patient.uuid;
            obsGroupeAutres.value = this.herodoCollateraux.value.autres;
            groupeSspMdrtb.push(obsGroupeAutres);
        }

        if(this.personnelsHabitubes.value.anteAucunePershab !== ""){
            let obsGroupePerHAnteAucune: ObsRequest = new ObsRequest();
            obsGroupePerHAnteAucune.concept = "163730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHAnteAucune.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHAnteAucune.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.anteAucunePershab == true){
                obsGroupePerHAnteAucune.value = "163608AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }else {
                obsGroupePerHAnteAucune.value = "163609AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeSspMdrtb.push(obsGroupePerHAnteAucune)
        }

        if(groupeSspMdrtb.length > 0){
            obsSspPreConsMdrtb.groupMembers = groupeSspMdrtb;
            obs.push(obsSspPreConsMdrtb);
        }


        ///////=================ANTECEDENTS PERSONNELS/HABITUDES

        ///==========accidentCerebroVas
        let obsAntPersHabAccCereVas: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabAccCereVas.concept = "e2347728-d872-4f2b-9c86-64f16c274461";
        obsAntPersHabAccCereVas.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabAccCereVas.person = this.dataVisit.patient;

        let groupeMembreAntPersHabAccCereVas: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.accidentCerebroVas !== ""){
            let obsGroupePerHAccidCere: ObsRequest = new ObsRequest();
            obsGroupePerHAccidCere.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHAccidCere.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHAccidCere.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.accidentCerebroVas == true){
                obsGroupePerHAccidCere.value = "152512AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabAccCereVas.push(obsGroupePerHAccidCere);
        }

        if(groupeMembreAntPersHabAccCereVas.length > 0 ){
            obsAntPersHabAccCereVas.groupMembers = groupeMembreAntPersHabAccCereVas;
            obs.push(obsAntPersHabAccCereVas);
        }


        ///==========Allergies
        let obsAntPersHabAllergies: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabAllergies.concept = "5d1236b4-f769-4691-9718-8762506c13bf";
        obsAntPersHabAllergies.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabAllergies.person = this.dataVisit.patient;

        let groupeMembreAntPersHabAllergies: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.allergiesPersHab !== ""){
            let obsGroupePerHAllergies: ObsRequest = new ObsRequest();
            obsGroupePerHAllergies.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHAllergies.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHAllergies.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.allergiesPersHab == true){
                obsGroupePerHAllergies.value = "110247AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHAllergies.comment = this.personnelsHabitubes.value.preciserAllerPersHab;
            groupeMembreAntPersHabAllergies.push(obsGroupePerHAllergies);
        }

        if(groupeMembreAntPersHabAllergies.length > 0 ){
            obsAntPersHabAllergies.groupMembers = groupeMembreAntPersHabAllergies;
            obs.push(obsAntPersHabAllergies);
        }


    ///==========Asthme
        let obsAntPersHabAsthme: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabAsthme.concept = "15254540-025e-44f9-91ab-27c243cdf79f";
        obsAntPersHabAsthme.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabAsthme.person = this.dataVisit.patient;

        let groupeMembreAntPersHabAsthme: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.asthmePersHab !== ""){
            let obsGroupePerHAsthme: ObsRequest = new ObsRequest();
            obsGroupePerHAsthme.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHAsthme.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHAsthme.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.asthmePersHab == true){
                obsGroupePerHAsthme.value = "139212AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabAsthme.push(obsGroupePerHAsthme);
        }

        if(groupeMembreAntPersHabAsthme.length > 0 ){
            obsAntPersHabAsthme.groupMembers = groupeMembreAntPersHabAsthme;
            obs.push(obsAntPersHabAsthme);
        }


    ///==========Cancer
        let obsAntPersHabCancer: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabCancer.concept = "53e0d1c2-3df5-4ab9-9b5c-d492fc22fd08";
        obsAntPersHabCancer.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabCancer.person = this.dataVisit.patient;

        let groupeMembreAntPersHabCancer: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.cancerPersHab !== ""){
            let obsGroupePerHCancer: ObsRequest = new ObsRequest();
            obsGroupePerHCancer.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHCancer.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHCancer.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.cancerPersHab == true){
                obsGroupePerHCancer.value = "151286AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHCancer.comment = this.personnelsHabitubes.value.preciserCancerPersHab;
            groupeMembreAntPersHabCancer.push(obsGroupePerHCancer);
        }

        if(groupeMembreAntPersHabCancer.length > 0 ){
            obsAntPersHabCancer.groupMembers = groupeMembreAntPersHabCancer;
            obs.push(obsAntPersHabCancer);
        }


        ///==========Cardiopathie
        let obsAntPersHabCardiopathie: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabCardiopathie.concept = "4c33937a-3cdc-49f1-8be8-611ecd41246f";
        obsAntPersHabCardiopathie.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabCardiopathie.person = this.dataVisit.patient;

        let groupeMembreAntPersHabCardiopathie: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.cardiopathiePersHab !== ""){
            let obsGroupePerHCardiopathie: ObsRequest = new ObsRequest();
            obsGroupePerHCardiopathie.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHCardiopathie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHCardiopathie.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.cardiopathiePersHab == true){
                obsGroupePerHCardiopathie.value = "122432AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabCardiopathie.push(obsGroupePerHCardiopathie);
        }

        if(groupeMembreAntPersHabCardiopathie.length > 0 ){
            obsAntPersHabCardiopathie.groupMembers = groupeMembreAntPersHabCardiopathie;
            obs.push(obsAntPersHabCardiopathie);
        }


        ///==========Chirurgie
        let obsAntPersHabChirurgie: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabChirurgie.concept = "35d13d8d-1fa2-4734-8c41-66c8ccee0c9f";
        obsAntPersHabChirurgie.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabChirurgie.person = this.dataVisit.patient;

        let groupeMembreAntPersHabChirurgie: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.cancerPersHab !== ""){
            let obsGroupePerHChirurgie: ObsRequest = new ObsRequest();
            obsGroupePerHChirurgie.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHChirurgie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHChirurgie.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.cancerPersHab == true){
                obsGroupePerHChirurgie.value = "163521AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHChirurgie.comment = this.personnelsHabitubes.value.preciserChiruPersHab;
            groupeMembreAntPersHabChirurgie.push(obsGroupePerHChirurgie);
        }

        if(groupeMembreAntPersHabChirurgie.length > 0 ){
            obsAntPersHabChirurgie.groupMembers = groupeMembreAntPersHabChirurgie;
            obs.push(obsAntPersHabChirurgie);
        }


        ///==========Trauma
        let obsAntPersHabTrauma: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabTrauma.concept = "48282f87-a839-4db8-b288-e260ccdef960";
        obsAntPersHabTrauma.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabTrauma.person = this.dataVisit.patient;

        let groupeMembreAntPersHabTrauma: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.traumaPersHab !== ""){
            let obsGroupePerHTrauma: ObsRequest = new ObsRequest();
            obsGroupePerHTrauma.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHTrauma.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHTrauma.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.traumaPersHab == true){
                obsGroupePerHTrauma.value = "163520AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHTrauma.comment = this.personnelsHabitubes.value.preciserTraumaPersHab;
            groupeMembreAntPersHabTrauma.push(obsGroupePerHTrauma);
        }

        if(groupeMembreAntPersHabTrauma.length > 0 ){
            obsAntPersHabTrauma.groupMembers = groupeMembreAntPersHabTrauma;
            obs.push(obsAntPersHabTrauma);
        }



        ///==========Diabète
        let obsAntPersHabDiabete: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabDiabete.concept = "8bf6b860-463a-43f4-9719-5b97491ccc2e";
        obsAntPersHabDiabete.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabDiabete.person = this.dataVisit.patient;

        let groupeMembreAntPersHabDiabete: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.duabetePersHab !== ""){
            let obsGroupePerHDiabete: ObsRequest = new ObsRequest();
            obsGroupePerHDiabete.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHDiabete.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHDiabete.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.duabetePersHab == true){
                obsGroupePerHDiabete.value = "156630AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabDiabete.push(obsGroupePerHDiabete);
        }

        if(groupeMembreAntPersHabDiabete.length > 0 ){
            obsAntPersHabDiabete.groupMembers = groupeMembreAntPersHabDiabete;
            obs.push(obsAntPersHabDiabete);
        }



        ///==========Epilepsie
        let obsAntPersHabEpilepsie: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabEpilepsie.concept = "e6eee25b-3aef-4728-b652-24407369e93e";
        obsAntPersHabEpilepsie.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabEpilepsie.person = this.dataVisit.patient;

        let groupeMembreAntPersHabEpilepsie: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.epilepsiePersHab !== ""){
            let obsGroupePerHEpilepsie: ObsRequest = new ObsRequest();
            obsGroupePerHEpilepsie.concept = "1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHEpilepsie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHEpilepsie.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.epilepsiePersHab == true){
                obsGroupePerHEpilepsie.value = "119399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabEpilepsie.push(obsGroupePerHEpilepsie);
        }

        if(groupeMembreAntPersHabEpilepsie.length > 0 ){
            obsAntPersHabEpilepsie.groupMembers = groupeMembreAntPersHabEpilepsie;
            obs.push(obsAntPersHabEpilepsie);
        }


        ///==========Grossesse
        let obsAntPersHabGrossesse: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabGrossesse.concept = "4de7f0d5-9ab4-4f91-8783-729480c01c45";
        obsAntPersHabGrossesse.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabGrossesse.person = this.dataVisit.patient;

        let groupeMembreAntPersHabGrossesse: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.grossessePersHab !== ""){
            let obsGroupePerHGrossesse: ObsRequest = new ObsRequest();
            obsGroupePerHGrossesse.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHGrossesse.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHGrossesse.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.grossessePersHab == true){
                obsGroupePerHGrossesse.value = "1434AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabGrossesse.push(obsGroupePerHGrossesse);
        }

        if(groupeMembreAntPersHabGrossesse.length > 0 ){
            obsAntPersHabGrossesse.groupMembers = groupeMembreAntPersHabGrossesse;
            obs.push(obsAntPersHabGrossesse);
        }



        ///==========Hémoglobinopathie
        let obsAntPersHabHemoglobinopathie: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabHemoglobinopathie.concept = "3b56c307-f65c-4eb9-8a43-b31dadb11fd1";
        obsAntPersHabHemoglobinopathie.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabHemoglobinopathie.person = this.dataVisit.patient;

        let groupeMembreAntPersHabHemoglobinopathie: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.hemoglobinopathiePersHab !== ""){
            let obsGroupePerHHemoglobinopathie: ObsRequest = new ObsRequest();
            obsGroupePerHHemoglobinopathie.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHHemoglobinopathie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHHemoglobinopathie.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.hemoglobinopathiePersHab == true){
                obsGroupePerHHemoglobinopathie.value = "163583AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHHemoglobinopathie.comment = this.personnelsHabitubes.value.preciserHemogPersHab
            groupeMembreAntPersHabHemoglobinopathie.push(obsGroupePerHHemoglobinopathie);
        }

        if(groupeMembreAntPersHabHemoglobinopathie.length > 0 ){
            obsAntPersHabHemoglobinopathie.groupMembers = groupeMembreAntPersHabHemoglobinopathie;
            obs.push(obsAntPersHabHemoglobinopathie);
        }


        ///==========HTA
        let obsAntPersHabHTA: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabHTA.concept = "1c5c74d9-f6cd-4050-a065-e4c53734cdb0";
        obsAntPersHabHTA.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabHTA.person = this.dataVisit.patient;

        let groupeMembreAntPersHabHTA: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.htaPersHab !== ""){
            let obsGroupePerHHTA: ObsRequest = new ObsRequest();
            obsGroupePerHHTA.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHHTA.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHHTA.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.htaPersHab == true){
                obsGroupePerHHTA.value = "156639AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabHTA.push(obsGroupePerHHTA);
        }

        if(groupeMembreAntPersHabHTA.length > 0 ){
            obsAntPersHabHTA.groupMembers = groupeMembreAntPersHabHTA;
            obs.push(obsAntPersHabHTA);
        }


        ///==========Hyperchoestérolémie
        let obsAntPersHabHyperchoestérolémie: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabHyperchoestérolémie.concept = "bcf2138a-51c8-4e1a-84fc-979a4ceb1567";
        obsAntPersHabHyperchoestérolémie.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabHyperchoestérolémie.person = this.dataVisit.patient;

        let groupeMembreAntPersHabHyperchoestérolémie: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.hyperchoesterolemiePersHab !== ""){
            let obsGroupePerHHyperchoestérolémie: ObsRequest = new ObsRequest();
            obsGroupePerHHyperchoestérolémie.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHHyperchoestérolémie.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHHyperchoestérolémie.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.hyperchoesterolemiePersHab == true){
                obsGroupePerHHyperchoestérolémie.value = "156633AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabHyperchoestérolémie.push(obsGroupePerHHyperchoestérolémie);
        }

        if(groupeMembreAntPersHabHyperchoestérolémie.length > 0 ){
            obsAntPersHabHyperchoestérolémie.groupMembers = groupeMembreAntPersHabHyperchoestérolémie;
            obs.push(obsAntPersHabHyperchoestérolémie);
        }


        ///==========IST
        let obsAntPersHabIST: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabIST.concept = "1da9522f-fded-4bf1-b728-0efccfd761cf";
        obsAntPersHabIST.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabIST.person = this.dataVisit.patient;

        let groupeMembreAntPersHabIST: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.istPersHab !== ""){
            let obsGroupePerHIST: ObsRequest = new ObsRequest();
            obsGroupePerHIST.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHIST.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHIST.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.istPersHab == true){
                obsGroupePerHIST.value = "156660AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHIST.comment = this.personnelsHabitubes.value.preciserIstPersHab
            groupeMembreAntPersHabIST.push(obsGroupePerHIST);
        }

        if(groupeMembreAntPersHabIST.length > 0 ){
            obsAntPersHabIST.groupMembers = groupeMembreAntPersHabIST;
            obs.push(obsAntPersHabIST);
        }


        ///==========Malnutrition
        let obsAntPersHabMalnutrition: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabMalnutrition.concept = "2d7111a8-095d-400a-af37-b9bffca66da4";
        obsAntPersHabMalnutrition.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabMalnutrition.person = this.dataVisit.patient;

        let groupeMembreAntPersHabMalnutrition: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.malnutritionPersHab !== ""){
            let obsGroupePerHMalnutrition: ObsRequest = new ObsRequest();
            obsGroupePerHMalnutrition.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHMalnutrition.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHMalnutrition.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.malnutritionPersHab == true){
                obsGroupePerHMalnutrition.value = "163584AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabMalnutrition.push(obsGroupePerHMalnutrition);
        }

        if(groupeMembreAntPersHabMalnutrition.length > 0 ){
            obsAntPersHabMalnutrition.groupMembers = groupeMembreAntPersHabMalnutrition;
            obs.push(obsAntPersHabMalnutrition);
        }


        ///==========Perte de poids
        let obsAntPersHabPertePoids: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabPertePoids.concept = "451dd9ad-c031-46cb-b27c-00e6375f9fec";
        obsAntPersHabPertePoids.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabPertePoids.person = this.dataVisit.patient;

        let groupeMembreAntPersHabPertePoids: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.pertePoidspersHab !== ""){
            let obsGroupePerHPertePoids: ObsRequest = new ObsRequest();
            obsGroupePerHPertePoids.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHPertePoids.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHPertePoids.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.pertePoidspersHab == true){
                obsGroupePerHPertePoids.value = "163585AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabPertePoids.push(obsGroupePerHPertePoids);
        }

        if(groupeMembreAntPersHabPertePoids.length > 0 ){
            obsAntPersHabPertePoids.groupMembers = groupeMembreAntPersHabPertePoids;
            obs.push(obsAntPersHabPertePoids);
        }


        ///==========Tuberculose
        let obsAntPersHabTuberculose: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabTuberculose.concept = "02d31d6e-7bd8-4acc-9c52-4ba8da14f17e";
        obsAntPersHabTuberculose.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabTuberculose.person = this.dataVisit.patient;

        let groupeMembreAntPersHabTuberculose: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.tuberculosePersHab !== ""){
            let obsGroupePerHTuberculose: ObsRequest = new ObsRequest();
            obsGroupePerHTuberculose.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHTuberculose.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHTuberculose.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.tuberculosePersHab == true){
                obsGroupePerHTuberculose.value = "151632AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabTuberculose.push(obsGroupePerHTuberculose);
        }

        if(groupeMembreAntPersHabTuberculose.length > 0 ){
            obsAntPersHabTuberculose.groupMembers = groupeMembreAntPersHabTuberculose;
            obs.push(obsAntPersHabTuberculose);
        }


        ///==========MDR TB
        let obsAntPersHabMDRTB: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabMDRTB.concept = "cc6cd6cc-436a-4d25-813c-52a6265b6ccc";
        obsAntPersHabMDRTB.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabMDRTB.person = this.dataVisit.patient;

        let groupeMembreAntPersHabMDRTB: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.mdrTbPersHab !== ""){
            let obsGroupePerHMDRTB: ObsRequest = new ObsRequest();
            obsGroupePerHMDRTB.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHMDRTB.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHMDRTB.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.mdrTbPersHab == true){
                obsGroupePerHMDRTB.value = "163586AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabMDRTB.push(obsGroupePerHMDRTB);
        }

        if(groupeMembreAntPersHabMDRTB.length > 0 ){
            obsAntPersHabMDRTB.groupMembers = groupeMembreAntPersHabMDRTB;
            obs.push(obsAntPersHabMDRTB);
        }


        ///==========Troubles psychiatriques , précisez
        let obsAntPersHabTrouPsy: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabTrouPsy.concept = "219fde2a-421e-4c48-96a9-c0f4451cc11f";
        obsAntPersHabTrouPsy.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabTrouPsy.person = this.dataVisit.patient;

        let groupeMembreAntPersHabTrouPsy: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.troublesPsychPersHab !== ""){
            let obsGroupePerHTrouPsy: ObsRequest = new ObsRequest();
            obsGroupePerHTrouPsy.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHTrouPsy.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHTrouPsy.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.troublesPsychPersHab == true){
                obsGroupePerHTrouPsy.value = "151282AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHTrouPsy.comment = this.personnelsHabitubes.value.preciserTrouPsyPersHab
            groupeMembreAntPersHabTrouPsy.push(obsGroupePerHTrouPsy);
        }

        if(groupeMembreAntPersHabTrouPsy.length > 0 ){
            obsAntPersHabTrouPsy.groupMembers = groupeMembreAntPersHabTrouPsy;
            obs.push(obsAntPersHabTrouPsy);
        }


        ///==========Alcool
        let obsAntPersHabAlcool: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabAlcool.concept = "8e455764-beb8-4c99-9922-82bb4e06506e";
        obsAntPersHabAlcool.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabAlcool.person = this.dataVisit.patient;

        let groupeMembreAntPersHabAlcool: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.alcoolPersHab !== ""){
            let obsGroupePerAlcool: ObsRequest = new ObsRequest();
            obsGroupePerAlcool.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerAlcool.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerAlcool.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.alcoolPersHab == true){
                obsGroupePerAlcool.value = "159449AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            groupeMembreAntPersHabAlcool.push(obsGroupePerAlcool);
        }

        if(groupeMembreAntPersHabAlcool.length > 0 ){
            obsAntPersHabAlcool.groupMembers = groupeMembreAntPersHabAlcool;
            obs.push(obsAntPersHabAlcool);
        }



        ///==========Drogue , précisez
        let obsAntPersHabDrogue: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabDrogue.concept = "4c0d6e3c-0cbb-4ffe-923f-e65a0d81eb3e";
        obsAntPersHabDrogue.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabDrogue.person = this.dataVisit.patient;

        let groupeMembreAntPersHabDrogue: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.droguePersHab !== ""){
            let obsGroupePerHDrogue: ObsRequest = new ObsRequest();
            obsGroupePerHDrogue.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerHDrogue.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerHDrogue.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.droguePersHab == true){
                obsGroupePerHDrogue.value = "162556AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerHDrogue.comment = this.personnelsHabitubes.value.preciserDroPersHab
            groupeMembreAntPersHabDrogue.push(obsGroupePerHDrogue);
        }

        if(groupeMembreAntPersHabDrogue.length > 0 ){
            obsAntPersHabDrogue.groupMembers = groupeMembreAntPersHabDrogue;
            obs.push(obsAntPersHabDrogue);
        }


        ///==========Tabac
        let obsAntPersHabTabac: ObsGroupRequest = new ObsGroupRequest();
        obsAntPersHabTabac.concept = "1741cdff-5df3-4d0b-8dca-1d0082e9f628";
        obsAntPersHabTabac.obsDatetime= this.dateEnregistrement.value.dateEnCtrl;
        obsAntPersHabTabac.person = this.dataVisit.patient;

        let groupeMembreAntPersHabTabac: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.tabacPersHab !== ""){
            let obsGroupePerTabac: ObsRequest = new ObsRequest();
            obsGroupePerTabac.concept = "1628AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePerTabac.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePerTabac.person = this.dataVisit.patient.uuid;
            if(this.personnelsHabitubes.value.tabacPersHab == true){
                obsGroupePerTabac.value = "163731AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            }
            obsGroupePerTabac.comment = this.personnelsHabitubes.value.preciserAutrePersHab
            groupeMembreAntPersHabTabac.push(obsGroupePerTabac);
        }

        if(groupeMembreAntPersHabTabac.length > 0 ){
            obsAntPersHabTabac.groupMembers = groupeMembreAntPersHabTabac;
            obs.push(obsAntPersHabTabac);
        }




        //=========  Médicaments actuels:
        let obsSspPersHabMedActuel: ObsGroupRequest = new ObsGroupRequest();
        obsSspPersHabMedActuel.concept = "4117e415-a43d-4462-b308-6709e87a7543";
        obsSspPersHabMedActuel.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;;
        obsSspPersHabMedActuel.person = this.dataVisit.patient.uuid;

        let groupMembreSspPersHabMedActuel: ObsRequest[] = [];
        if(this.personnelsHabitubes.value.medicamentsActPersHab !== ""){
            let obsGroupePersHabMedActuel: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuel.concept = "159367AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuel.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuel.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuel.value = this.personnelsHabitubes.value.medicamentsActPersHab;
            obsGroupePersHabMedActuel.comment = this.personnelsHabitubes.value.textMedicaPersHab;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuel);
        }

        // if(this.personnelsHabitubes.value.textMedicaPersHab !== ""){
        //     let obsGroupePersHabMedActuelText: ObsRequest = new ObsRequest();
        //     obsGroupePersHabMedActuelText.concept = "160221AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        //     obsGroupePersHabMedActuelText.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
        //     obsGroupePersHabMedActuelText.person = this.dataVisit.patient.uuid;
        //     obsGroupePersHabMedActuelText.value = this.personnelsHabitubes.value.textMedicaPersHab;
        //     groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelText);
        // }

        if(this.personnelsHabitubes.value.remarquePersHab !== ""){
            let obsGroupePersHabMedActuelRemar: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelRemar.concept = "160221AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelRemar.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelRemar.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelRemar.value = this.personnelsHabitubes.value.remarquePersHab;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelRemar);
        }


        if(this.personnelsHabitubes.value.pds !== ""){
            let obsGroupePersHabMedActuelPds: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelPds.concept = "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelPds.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelPds.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelPds.value = this.personnelsHabitubes.value.pds;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelPds);
        }

        if(this.personnelsHabitubes.value.temp !== ""){
            let obsGroupePersHabMedActuelTemp: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelTemp.concept = "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelTemp.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelTemp.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelTemp.value = this.personnelsHabitubes.value.temp;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelTemp);
        }

        if(this.personnelsHabitubes.value.taille !== ""){
            let obsGroupePersHabMedActuelTaille: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelTaille.concept = "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelTaille.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelTaille.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelTaille.value = this.personnelsHabitubes.value.taille;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelTaille);
        }


        if(this.personnelsHabitubes.value.pouls !== ""){
            let obsGroupePersHabMedActuelPouls: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelPouls.concept = "5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelPouls.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelPouls.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelPouls.value = this.personnelsHabitubes.value.pouls;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelPouls);
        }

        if(this.personnelsHabitubes.value.ta1 !== ""){
            let obsGroupePersHabMedActuelTa1: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelTa1.concept = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelTa1.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelTa1.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelTa1.value = this.personnelsHabitubes.value.ta1;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelTa1);
        }

        if(this.personnelsHabitubes.value.ta2 !== ""){
            let obsGroupePersHabMedActuelTa2: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelTa2.concept = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelTa2.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelTa2.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelTa2.value = this.personnelsHabitubes.value.ta2;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelTa2);
        }

        if(this.personnelsHabitubes.value.fr !== ""){
            let obsGroupePersHabMedActuelFr: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelFr.concept = "5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsGroupePersHabMedActuelFr.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelFr.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelFr.value = this.personnelsHabitubes.value.fr;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelFr);
        }

        if(this.personnelsHabitubes.value.nomPrenomPrest !== ""){
            let obsGroupePersHabMedActuelNomPrenomPrest: ObsRequest = new ObsRequest();
            obsGroupePersHabMedActuelNomPrenomPrest.concept = "157d5d16-b207-40c3-9447-9819c2863df5\n";
            obsGroupePersHabMedActuelNomPrenomPrest.obsDatetime = this.dateEnregistrement.value.dateEnCtrl;
            obsGroupePersHabMedActuelNomPrenomPrest.person = this.dataVisit.patient.uuid;
            obsGroupePersHabMedActuelNomPrenomPrest.value = this.personnelsHabitubes.value.nomPrenomPrest;
            groupMembreSspPersHabMedActuel.push(obsGroupePersHabMedActuelNomPrenomPrest);
        }



        if(groupMembreSspPersHabMedActuel.length > 0){
            obsSspPersHabMedActuel.groupMembers = groupMembreSspPersHabMedActuel;
            obs.push(obsSspPersHabMedActuel);
        }




        this.addEncounterSspPreCons.obs = obs;

        console.log(this.addEncounterSspPreCons);





        this.api.postEncounter(this.addEncounterSspPreCons)
            .subscribe({
                next: (res)=>{
                    // alert("Save successfully")
                    const resultSspPreCons=res;
                    console.log(resultSspPreCons);

                    this.router.navigateByUrl('/home/dashConsultation').then(() => {
                        window.location.reload();
                        //  this.router.navigate(['/home/dashConsultation']);
                    });

                },
                error: (err)=>{
                    alert("Error save")
                }
            })




    }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


}


