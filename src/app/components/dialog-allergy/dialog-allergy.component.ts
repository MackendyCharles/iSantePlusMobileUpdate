import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddEncounterVitaux} from "../../interfaces/addEncounter";
import {MaterialModule} from "../../material.module";
import {ApiService} from "../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../services/tokenStorage.service";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {MatSelectChange} from "@angular/material/select";
import {Allergen, Allergies, CodedAllergen, Reaction, Reactions, Severity} from "../../models/allergies";
import {element} from "protractor";
import {AppConstant} from "../../common/app-constant";

@Component({
    selector: 'app-dialog-allergy',
    templateUrl: './dialog-allergy.component.html',
    styleUrls: ['./dialog-allergy.component.scss'],
})
export class DialogAllergyComponent implements OnInit {

    pet = 'drug';
    isAndroid = false;

    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());

    dateForm !: FormGroup;
    drogForm !: FormGroup;
    actionBtn: any = "Save";
    private addEncounterVitaux: AddEncounterVitaux;
    maxDate: any;
    dataSourceUpdate: any;

    drugResults: any;
    selectedDrug: string;
    drugSelected: any;

    foodResults: any;
    selectedFood: string;
    foodSelected: any;

    otherResults: any;
    selectedOther: string;
    otherSelected: any;

    reactionResults: any;
    selectedReaction: string[] = [];
    reactionSelected: any;

    typeAllergy;
    codeAllergy;
    allReaction: any[];

    constructor(private materialModule: MaterialModule,
                private formBuilder: FormBuilder,
                private api: ApiService,
                @Inject(MAT_DIALOG_DATA) public editData: any,
                private dialogRef: MatDialogRef<DialogAllergyComponent>,
                private token: TokenStorageService,
                private permissions: AndroidPermissions) {
    }


    ngOnInit() {

        console.log(this.editData);
        this.typeAllergy = "DRUG";
        this.maxDate = new Date();
        this.dateForm = this.formBuilder.group({
            dateEnCtrl: ['', Validators.required],
        });

        this.drogForm = this.formBuilder.group({
            drug: ['', Validators.required],
            food: ['', Validators.required],
            other: ['', Validators.required],
            reactions: ['', Validators.required],
            gravite: ['', Validators.required],
            commentaire: ['', Validators.required]
        })

        //console.log(this.editData);

        if (this.editData.length >= 2) {
            this.actionBtn = "update";

            this.drogForm.controls['commentaire'].setValue(this.editData[0].comment);
            this.drogForm.controls['gravite'].patchValue(this.editData[0].severity.uuid);
            this.pet = this.editData[0].allergen.allergenType.toLowerCase();

            if (this.editData[0].allergen.allergenType == 'DRUG') {
                this.selectedDrug = this.editData[0].allergen.codedAllergen.uuid;
            } else if (this.editData[0].allergen.allergenType == 'FOOD') {
                this.selectedFood = this.editData[0].allergen.codedAllergen.uuid;
            } else if (this.editData[0].allergen.allergenType == 'OTHER') {
                this.selectedOther = this.editData[0].allergen.codedAllergen.uuid;
            }

            let allreaction = this.editData[0].reactions;

            let reactionArray: string[] = [];

            allreaction.forEach((element) => {
                reactionArray.push(element.reaction.uuid);
            })
            this.selectedReaction = reactionArray;
            console.log(reactionArray)


        }

        //data in the Drug
        fetch("./assets/inputFile/drugs.json")
            .then((resDrug) => resDrug.json())
            .then((jsonDrug) => {
                console.log("results::", jsonDrug);
                this.drugResults = jsonDrug;
            });

        //data in the Food
        fetch("./assets/inputFile/foods.json")
            .then((resFood) => resFood.json())
            .then((jsonFood) => {
                console.log("results::", jsonFood);
                this.foodResults = jsonFood;
            });

        //data in the Other
        fetch("./assets/inputFile/others.json")
            .then((resOther) => resOther.json())
            .then((jsonOther) => {
                console.log("results::", jsonOther);
                this.otherResults = jsonOther;
            });

        //data in the Other
        fetch("./assets/inputFile/reactions.json")
            .then((resReation) => resReation.json())
            .then((jsonReaction) => {
                console.log("results::", jsonReaction);
                this.reactionResults = jsonReaction;
            });

    }


    addVAllergies() {
        if (this.editData.length>=2) {

            this.updateAllergies();

        } else {

            this.saveAllergies();

        }

    }

    updateAllergies() {

        this.editData[1].patientUuid;

        console.log(this.editData[0].uuid)


        this.token.getUser();
        console.log(this.token.getUser().uuid);

        let codeAllergen = new CodedAllergen();
        codeAllergen.uuid = this.codeAllergy;

        let allergen = new Allergen();
        allergen.allergenType = this.typeAllergy;
        allergen.codedAllergen = codeAllergen;

        let severity = new Severity();
        severity.uuid = this.drogForm.value.gravite;

        let reaction = new Reaction();

        let reactionsAll: Reactions[] = [];
        let reactions: Reactions = new Reactions();

        console.log(this.allReaction);
        for (let i = 0; i < this.allReaction.length; i++) {
            reaction = new Reaction();
            reaction.uuid = this.allReaction[i]
            console.log(reaction)
            reactions = new Reactions();
            reactions.reaction =reaction;
            // reactions[i] = this.allReaction[i];
            reactionsAll.push(reactions);
        }
        // reactionsAll.push(reactions);



        let allergies = new Allergies();
        allergies.allergen = allergen;
        allergies.severity = severity;
        allergies.comment = this.drogForm.value.commentaire;
        allergies.reactions = reactionsAll;

        console.log(allergies);


        this.api.postAllergies(allergies, this.editData.patientUuid)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.drogForm.reset();
                    this.dialogRef.close('save')

                },
                error: (err) => {
                    alert("Error while adding signes Vitaux");
                }
            })
    }

    setCodeAllergy(code: any) {
        this.typeAllergy = code;
    }

    selectedDrug2(event: MatSelectChange) {
        this.drugSelected = event.value
        //this.drugSelected = event.source.triggerValue;
        console.log(this.drugSelected)

        this.codeAllergy = this.drugSelected;

    }

    selectedFood2(event: MatSelectChange) {
        this.foodSelected = event.value

        // this.foodSelected = event.source.triggerValue;
        console.log(this.foodSelected)

        this.codeAllergy = this.foodSelected;
    }

    selectedOther2(event: MatSelectChange) {
        this.otherSelected = event.value;

        this.codeAllergy = this.otherSelected;

        //this.otherSelected = event.source.triggerValue;
    }

    selectedReaction2(event: MatSelectChange) {
        this.reactionSelected = event.value;

        this.allReaction = this.reactionSelected;
        console.log(this.reactionSelected)
        //this.reactionSelected = event.source.triggerValue;
    }

    saveAllergies() {
        this.token.getUser();
        console.log(this.token.getUser().uuid);

        let codeAllergen = new CodedAllergen();
        codeAllergen.uuid = this.codeAllergy;

        let allergen = new Allergen();
        allergen.allergenType = this.typeAllergy;
        allergen.codedAllergen = codeAllergen;

        let severity = new Severity();
        severity.uuid = this.drogForm.value.gravite;

        let reaction = new Reaction();

        let reactionsAll: Reactions[] = [];
        let reactions: Reactions = new Reactions();

        console.log(this.allReaction);
        for (let i = 0; i < this.allReaction.length; i++) {
            reaction = new Reaction();
            reaction.uuid = this.allReaction[i]
            console.log(reaction)
            reactions = new Reactions();
            reactions.reaction =reaction;
            // reactions[i] = this.allReaction[i];
            reactionsAll.push(reactions);
        }
        // reactionsAll.push(reactions);



        let allergies = new Allergies();
        allergies.allergen = allergen;
        allergies.severity = severity;
        allergies.comment = this.drogForm.value.commentaire;
        allergies.reactions = reactionsAll;

        console.log("AL:::",allergies);


        this.api.postAllergies(allergies, this.editData.patientUuid)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.drogForm.reset();
                    this.dialogRef.close('save')

                },
                error: (err) => {
                    alert("Error while adding signes Vitaux");
                }
            })
    }


}
