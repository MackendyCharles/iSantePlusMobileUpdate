import { Component, OnInit } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/api.service';
import {DialogBoxComponent} from "../../components/dialog-box/dialog-box.component";
import {DialogAllergyComponent} from "../../components/dialog-allergy/dialog-allergy.component";

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.page.html',
  styleUrls: ['./allergies.page.scss'],
})
export class AllergiesPage implements OnInit {

  dataSource;
  public patientInfo : any;
  items;
  cp: number = 1;
  dataSourcePatient: any
  patientUuid : string;
  pageName: string;

  patientName : string;

  constructor(private dialog: MatDialog, private materialModule: MaterialModule, private api : ApiService,public router: Router) {
      if (router.getCurrentNavigation().extras.state) {
         this.patientInfo = this.router.getCurrentNavigation().extras.state;
         console.log(this.patientInfo) ;
      }
   }




   getItems(ev) {
    // Reset items back to all of the items
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.dataSource.results = this.dataSource.results.filter((item) => {
        return (item.display.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.ngOnInit()
    }
  }

  openDialog() {
    this.dialog.open(DialogAllergyComponent, {
      width: '60%',
      disableClose: true,
      closeOnNavigation: false,
      data: this.patientInfo

    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllAllergie();
      }
    })
  }

  getAllAllergie(){
    this.api.getAllergiesAllByPatient(this.patientUuid)
    .subscribe({
      next : (res)=>{
        this.dataSource = res;
        console.log(this.dataSource)
      },
      error:(err)=>{
       // alert("Error while fetching the Records")
      }
    })
  }

  editAllergie(row : any){
    this.dialog.open(DialogAllergyComponent,{
      width : '90%',
      data : [row , this.patientInfo]
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getAllAllergie();
      }
    })
  }

  ngOnInit() {
    this.loadPatient();
     this.getAllAllergie();
  }

  deleteAllergie(id : number){
    this.api.deleteAllergie(id)
    .subscribe({
      next : (res) =>{
        alert("Signes Vitaux Delete Successfully");
        this.getAllAllergie();
      },
      error : (err) =>{
        alert("Error while Delete Signes Vitaux");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

}
