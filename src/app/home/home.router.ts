import {NgModule} from '@angular/core';
import {RouterModule , Routes} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: 'home' ,
        component: HomePage ,
        children: [
            {
                path: 'dashboad' ,
                loadChildren: () =>
                    import('../pages/dashboad/dashboad.module').then(
                        m => m.DashboadPageModule
                    )

            } ,
            {
                path: 'patient' ,
                loadChildren: () =>
                    import('../pages/patient/patient.module').then(
                        m => m.PatientPageModule
                    )

            }
            ,
            {
                path: 'vitaux' ,
                loadChildren: () =>
                    import('../pages/vitaux/vitaux.module').then(
                        m => m.VitauxPageModule
                    )

            }
            ,
            {
                path: 'recherche' ,
                loadChildren: () =>
                    import('../pages/recherche/recherche.module').then(
                        m => m.RecherchePageModule
                    )

            }
            ,
            {
                path: 'rapport' ,
                loadChildren: () =>
                    import('../pages/rapport/rapport.module').then(
                        m => m.RapportPageModule
                    )

            }
            ,
            {
                path: 'dashPatient' ,
                loadChildren: () =>
                    import('../pages/dashPatient/dashPatient.module').then(
                        m => m.DashPatientPageModule
                    )

            }
            ,
            {
                path: 'dashVitaux' ,
                loadChildren: () =>
                    import('../pages/dashVitaux/dashVitaux.module').then(
                        m => m.DashVitauxPageModule
                    )

            } ,
            {
                path: 'allergies' ,
                loadChildren: () =>
                    import('../pages/allergies/allergies.module').then(
                        m => m.AllergiesPageModule
                    )

            } ,
            {
                path: 'dashConsultation' ,
                loadChildren: () =>
                    import('../pages/dashConsultation/dashConsultation.module').then(
                        m => m.DashConsultationPageModule
                    )
            }  ,
            {
                path: 'laboratoire' ,
                loadChildren: () => import('../pages/dashConsultation/laboratoire/laboratoire.module').then(m => m.LaboratoirePageModule)
            } ,
            {
                path: 'ordonnance' ,
                loadChildren: () => import('../pages/dashConsultation/ordonnance/ordonnance.module').then(m => m.OrdonnancePageModule)
            },
            {
              path: 'premiereConsultationSsp',
              loadChildren: () => import('../pages/premiere-consultation-ssp/premiere-consultation-ssp.module').then( m => m.PremiereConsultationSSPPageModule)
            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)] ,
})
export class HomeRouter {
}
