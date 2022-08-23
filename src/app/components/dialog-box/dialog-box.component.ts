import {Component , Inject , OnInit} from '@angular/core';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {ValueAccessor} from '@ionic/angular/directives/control-value-accessors/value-accessor';
import {AddEncounter , AddEncounterVitaux} from 'src/app/interfaces/addEncounter';
import {EncounterProviderExport} from 'src/app/models/encounterProvider';
import {ObsGroupRequest , ObsGroupRequestValueNumber , ObsRequest} from 'src/app/models/obs';
import {ApiService} from 'src/app/services/api.service';
import {TokenStorageService} from 'src/app/services/tokenStorage.service';
import {MaterialModule} from '../../material.module';
import {AppConstant} from "../../common/app-constant";

@Component({
    selector: 'app-dialog-box' ,
    templateUrl: './dialog-box.component.html' ,
    styleUrls: ['./dialog-box.component.scss'] ,
})
export class DialogBoxComponent implements OnInit {

    date = new FormControl(new Date());
    //serializedDate = new FormControl(new Date().toISOString());

    vitauxForm !: FormGroup;
    actionBtn: any = "Save";
    private addEncounterVitaux: AddEncounterVitaux;
    maxDate: any;
    dataSourceUpdate: any;

    constructor(private materialModule: MaterialModule ,
                private formBuilder: FormBuilder ,
                private api: ApiService ,
                @Inject(MAT_DIALOG_DATA) public editData: any ,
                private dialogRef: MatDialogRef<DialogBoxComponent> ,
                private token: TokenStorageService ,
                private permissions: AndroidPermissions) {
    }


    ngOnInit() {
        this.maxDate = new Date();
        this.vitauxForm = this.formBuilder.group({
            dateEnCtrl: this.date ,
            hauteur: ['' ] ,
            poids: ['' ] ,
            imc: [''] ,
            temperature: ['' ] ,
            pouls: ['' ] ,
            frequenseResp: ['' ] ,
            tensionArtSyst: ['' ] ,
            tensionArtDiast: ['' ] ,
            saturationOxySan: ['']
        });

        console.log(this.editData);

        if (this.editData.length >= 2) {
            this.actionBtn = "update";

            this.api.getVitauxEncounter(this.editData[0].uuid)
                .subscribe({
                    next: (res) => {

                        this.dataSourceUpdate = res;
                        console.log(this.dataSourceUpdate);
                        this.date = new FormControl(new Date(this.dataSourceUpdate.encounterDatetime));
                        //this.vitauxForm.controls['dateEnCtrl'].setValue('14-04-2022');
                        console.log(this.dataSourceUpdate.encounterDatetime);

                        let _hauteur: any = this.dataSourceUpdate.obs[5].display.split(":" , 2);
                        this.vitauxForm.controls['hauteur'].setValue(_hauteur[1]);

                        let _poids = this.dataSourceUpdate.obs[4].display.split(":" , 2);
                        this.vitauxForm.controls['poids'].setValue(_poids[1]);

                        let _temperature = this.dataSourceUpdate.obs[3].display.split(":" , 2);
                        this.vitauxForm.controls['temperature'].setValue(_temperature[1]);

                        let _pouls = this.dataSourceUpdate.obs[2].display.split(":" , 2);
                        this.vitauxForm.controls['pouls'].setValue(_pouls[1]);

                        let _frequenseResp = this.dataSourceUpdate.obs[7].display.split(":" , 2);
                        this.vitauxForm.controls['frequenseResp'].setValue(_frequenseResp[1]);

                        let _saturationOxySan = this.dataSourceUpdate.obs[6].display.split(":" , 2);
                        this.vitauxForm.controls['saturationOxySan'].setValue(_saturationOxySan[1]);

                        let _tensionArtSyst = this.dataSourceUpdate.obs[0].display.split(":" , 2);
                        this.vitauxForm.controls['tensionArtSyst'].setValue(_tensionArtSyst[1]);

                        let _tensionArtDiast = this.dataSourceUpdate.obs[1].display.split(":" , 2);
                        this.vitauxForm.controls['tensionArtDiast'].setValue(_tensionArtDiast[1]);

                        var numPoids = parseFloat(_poids[1]);
                        var numHauteur = parseFloat(_hauteur[1]);

                        console.log(numPoids)

                        console.log(numHauteur * 2);


                        let _imc = this.calculIMC(numPoids , numHauteur);
                        console.log(_imc)
                        this.vitauxForm.controls['imc'].setValue(_imc);

                        console.log(this.dataSourceUpdate.uuid)

                    } ,
                    error: (err) => {

                    }
                })

        }

    }

    calculIMC(poids: number , hauteur: number) {

        var _result = Math.floor(poids / hauteur);
        console.log(_result);
        return _result;
    }

    addVitaux() {
        if (this.editData.length >= 2) {

            console.log("Update")

            this.updateVitaux();

        } else {

            console.log("Save")

            this.saveVitaux();

        }

    }

    updateVitaux() {
        // OBS

        let obs: ObsRequest[] = [];

        let obsTailleRequest: ObsRequest = new ObsRequest();
        obsTailleRequest.concept = "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsTailleRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obsTailleRequest.person = this.editData.patientUuid;
        obsTailleRequest.value = parseFloat(this.vitauxForm.value.hauteur);
        obsTailleRequest.encounter = this.dataSourceUpdate.uuid;
        obsTailleRequest.obs = this.dataSourceUpdate.obs[5].uuid;
        obs.push(obsTailleRequest);

        let obsPoidsRequest: ObsRequest = new ObsRequest();
        obsPoidsRequest.concept = "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsPoidsRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obsPoidsRequest.person = this.editData.patientUuid;
        obsPoidsRequest.value = parseFloat(this.vitauxForm.value.poids);
        obsPoidsRequest.encounter = this.dataSourceUpdate.uuid;
        obsPoidsRequest.obs = this.dataSourceUpdate.obs[4].uuid;
        obs.push(obsPoidsRequest);

        let obsTemperatureRequest: ObsRequest = new ObsRequest();
        obsTemperatureRequest.concept = "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsTemperatureRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obsTemperatureRequest.person = this.editData.patientUuid;
        obsTemperatureRequest.value = parseFloat(this.vitauxForm.value.temperature);
        obsTemperatureRequest.encounter = this.dataSourceUpdate.uuid;
        obsTemperatureRequest.obs = this.dataSourceUpdate.obs[3].uuid;
        obs.push(obsTemperatureRequest);

        let obsPoulsRequest: ObsRequest = new ObsRequest();
        obsPoulsRequest.concept = "5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsPoulsRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obsPoulsRequest.person = this.editData.patientUuid;
        obsPoulsRequest.value = parseFloat(this.vitauxForm.value.pouls);
        obsPoulsRequest.encounter = this.dataSourceUpdate.uuid;
        obsPoulsRequest.obs = this.dataSourceUpdate.obs[2].uuid;
        obs.push(obsPoulsRequest);


        let obsfrequenseRespRequest: ObsRequest = new ObsRequest();
        obsfrequenseRespRequest.concept = "5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obsfrequenseRespRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obsfrequenseRespRequest.person = this.editData.patientUuid;
        obsfrequenseRespRequest.value = parseFloat(this.vitauxForm.value.frequenseResp);
        obsfrequenseRespRequest.encounter = this.dataSourceUpdate.uuid;
        obsfrequenseRespRequest.obs = this.dataSourceUpdate.obs[7].uuid;
        obs.push(obsfrequenseRespRequest);


        let obstensionArtSystRequest: ObsRequest = new ObsRequest();
        obstensionArtSystRequest.concept = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obstensionArtSystRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obstensionArtSystRequest.person = this.editData.patientUuid;
        obstensionArtSystRequest.value = parseFloat(this.vitauxForm.value.tensionArtSyst);
        obstensionArtSystRequest.encounter = this.dataSourceUpdate.uuid;
        obstensionArtSystRequest.obs = this.dataSourceUpdate.obs[0].uuid;
        obs.push(obstensionArtSystRequest);

        let obstensionArtDiastRequest: ObsRequest = new ObsRequest();
        obstensionArtDiastRequest.concept = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obstensionArtDiastRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obstensionArtDiastRequest.person = this.editData.patientUuid;
        obstensionArtDiastRequest.value = parseFloat(this.vitauxForm.value.tensionArtDiast);
        obstensionArtDiastRequest.encounter = this.dataSourceUpdate.uuid;
        obstensionArtDiastRequest.obs = this.dataSourceUpdate.obs[1].uuid;
        obs.push(obstensionArtDiastRequest);

        let obssaturationOxySanRequest: ObsRequest = new ObsRequest();
        obssaturationOxySanRequest.concept = "5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        obssaturationOxySanRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
        obssaturationOxySanRequest.person = this.editData.patientUuid;
        obssaturationOxySanRequest.value = parseFloat(this.vitauxForm.value.saturationOxySan);
        obssaturationOxySanRequest.encounter = this.dataSourceUpdate.uuid;
        obssaturationOxySanRequest.obs = this.dataSourceUpdate.obs[6].uuid;
        obs.push(obssaturationOxySanRequest);


        this.api.postVitauxUpdate(obs)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    alert("Signes VItaux Updated Successfully");
                    this.vitauxForm.reset();
                    this.dialogRef.close('update');
                } ,
                error: (err) => {
                    alert("Error while Updating Signes Vitaux")
                }
            })
    }

    saveVitaux() {

        this.token.getUser();
        console.log(this.token.getUser().uuid);

        this.addEncounterVitaux = new AddEncounterVitaux();
        this.addEncounterVitaux.encounterDatetime = this.vitauxForm.value.dateEnCtrl;
        this.addEncounterVitaux.patient = this.editData.patientUuid;
        this.addEncounterVitaux.encounterType = "67a71486-1a54-468f-ac3e-7091a9a79584";
        this.addEncounterVitaux.location = AppConstant.LOCAION_UUID;

        let encounterProviderExports: EncounterProviderExport[] = [];

        let encounterProviderExport: EncounterProviderExport = new EncounterProviderExport();
        encounterProviderExport.provider = this.token.getUser().provider;
        encounterProviderExport.encounterRole = "ef0445e7-bfe6-4260-a351-09fc835b6bcd";

        encounterProviderExports.push(encounterProviderExport);

        this.addEncounterVitaux.encounterProviders = encounterProviderExports;

        // OBS

        let obs: ObsGroupRequestValueNumber[] = [];

        if(this.vitauxForm.value.hauteur !== ""){
            let obsTailleRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsTailleRequest.concept = "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsTailleRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obsTailleRequest.person = this.editData.patientUuid;
            obsTailleRequest.value = this.vitauxForm.value.hauteur;
            obs.push(obsTailleRequest);
        }
       
        if(this.vitauxForm.value.poids !== ""){
            let obsPoidsRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsPoidsRequest.concept = "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsPoidsRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obsPoidsRequest.person = this.editData.patientUuid;
            obsPoidsRequest.value = this.vitauxForm.value.poids;
            obs.push(obsPoidsRequest);
        }
       

        if(this.vitauxForm.value.temperature !== "") {
            let obsTemperatureRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsTemperatureRequest.concept = "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsTemperatureRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obsTemperatureRequest.person = this.editData.patientUuid;
            obsTemperatureRequest.value = this.vitauxForm.value.temperature;
            obs.push(obsTemperatureRequest);
        }
       

        if(this.vitauxForm.value.pouls !== ""){
            let obsPoulsRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsPoulsRequest.concept = "5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsPoulsRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obsPoulsRequest.person = this.editData.patientUuid;
            obsPoulsRequest.value = this.vitauxForm.value.pouls;
            obs.push(obsPoulsRequest);
        }
       


        if(this.vitauxForm.value.frequenseResp !== ""){
            let obsfrequenseRespRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obsfrequenseRespRequest.concept = "5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obsfrequenseRespRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obsfrequenseRespRequest.person = this.editData.patientUuid;
            obsfrequenseRespRequest.value = this.vitauxForm.value.frequenseResp;
            obs.push(obsfrequenseRespRequest);
        }
        

        if(this.vitauxForm.value.tensionArtSyst !== ""){
            let obstensionArtSystRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obstensionArtSystRequest.concept = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obstensionArtSystRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obstensionArtSystRequest.person = this.editData.patientUuid;
            //obstensionArtSystRequest.value = 30;
            obstensionArtSystRequest.value = this.vitauxForm.value.tensionArtSyst;
            obs.push(obstensionArtSystRequest);
        }
        
        if(this.vitauxForm.value.tensionArtDiast !== ""){
            let obstensionArtDiastRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obstensionArtDiastRequest.concept = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obstensionArtDiastRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obstensionArtDiastRequest.person = this.editData.patientUuid;
            //obstensionArtDiastRequest.value = 40;
            obstensionArtDiastRequest.value = this.vitauxForm.value.tensionArtDiast;
            obs.push(obstensionArtDiastRequest);
        }
       
        if(this.vitauxForm.value.saturationOxySan !== ""){
            let obssaturationOxySanRequest: ObsGroupRequestValueNumber = new ObsGroupRequestValueNumber();
            obssaturationOxySanRequest.concept = "5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            obssaturationOxySanRequest.obsDatetime = this.vitauxForm.value.dateEnCtrl;
            obssaturationOxySanRequest.person = this.editData.patientUuid;
            obssaturationOxySanRequest.value = this.vitauxForm.value.saturationOxySan;
            obs.push(obssaturationOxySanRequest);
        }
        


        this.addEncounterVitaux.obs = obs;


        console.log(this.addEncounterVitaux);


        if (this.vitauxForm.valid) {
            this.api.postEncounter(this.addEncounterVitaux)
                .subscribe({
                    next: (res) => {
                        alert("Signes Vitaux Added Successfully");
                        this.vitauxForm.reset();
                        this.dialogRef.close('save');

                        console.log(res);


                    } ,
                    error: (err) => {
                        alert("Error while adding signes Vitaux");
                    }
                })
        }
    }

}

