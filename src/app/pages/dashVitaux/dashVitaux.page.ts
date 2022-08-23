import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
import { MaterialModule } from '../../material.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dash-vitaux',
  templateUrl: './dashVitaux.page.html',
  styleUrls: ['./dashVitaux.page.scss'],
})
export class DashVitauxPage implements OnInit {

  dataSource: any;
  public patientInfo : any;
  items;
  cp: number = 1;

  patientName : string;

  dataSourcePatient: any

  pageName: string;

   patientUuid : string;

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
    this.dialog.open(DialogBoxComponent, {
      width: '60%',
      disableClose: true,
      closeOnNavigation: false,
      data: this.patientInfo

    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllVitaux();
      }
    })
  }

  getAllVitaux(){
    if(this.patientUuid){
      this.api.getVitauxPatientEncounterType(this.patientUuid,"67a71486-1a54-468f-ac3e-7091a9a79584")
          .subscribe({
            next : (res)=>{
              this.dataSource = res;
            },
            error:(err)=>{
              alert("Error while fetching the Records")
            }
          })
    }else{

    }

  }

  editVitaux(row : any){

    console.log(row);

    this.dialog.open(DialogBoxComponent,{
      width : '80%',
      data : [row , this.patientInfo]
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getAllVitaux();
      }
    })
  }

  ngOnInit() {
    this.loadPatient();
     this.getAllVitaux();

  }

  deleteVitaux(id : number){
    this.api.deleteVitaux(id)
    .subscribe({
      next : (res) =>{
        alert("Signes Vitaux Delete Successfully");
        this.getAllVitaux();
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

            if(res){

              this.dataSourcePatient = res;

              this.patientName =  this.dataSourcePatient.person.display;

              console.log(this.dataSourcePatient)

            }





          });

      // console.log(this.dataSource.patient.links[0].uri);


    }
  }

}
