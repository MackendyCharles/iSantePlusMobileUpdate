import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConstant} from "../common/app-constant";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    postVitaux(data: any) {
        return this.http.post<any>("http://localhost:3000/vitauxList/" , data);

    }

    getVitauxPatientEncounterType(patientUuid: string , encounterTypeUuid: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/encounter/" + patientUuid + "/" + encounterTypeUuid);
    }

    getVitauxEncounter(encounterVitauxUuid: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/encounter/" + encounterVitauxUuid);
    }

    putVitaux(data: any , id: number) {
        return this.http.put<any>("http://localhost:3000/vitauxList/" + id , data);
    }

    deleteVitaux(id: number) {
        return this.http.delete("http://localhost:3000/vitauxList/" + id);
    }

    // Enregistrement Patient

    postPatient(data: any) {
        return this.http.post<any>(AppConstant.API_BASE_URL + "/patient" , data);
    }

    postEncounter(data: any) {
        return this.http.post<any>(AppConstant.API_BASE_URL + "/encounter" , data);
    }

    postVitauxUpdate(data: any) {
        return this.http.put<any>(AppConstant.API_BASE_URL + "/obs" , data);
    }

    getPatientByCriteria(criteria: String , limit: number) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/patient/" + criteria + "/" + limit);
    }

    getPatientId(id: number) {
        return this.http.get<any>("http://localhost:3000/patientList/" + id);
    }

    getPatientUuid(links: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/patient/" + links);
    }

   


    //---------------------ALLERGIES
    getAllergiePatientEncounterType(patientUuid: string , encounterTypeUuid: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/encounter/" + patientUuid + "/" + encounterTypeUuid);
    }

    postAllergies(data: any , uuid: string) {
        return this.http.post<any>(AppConstant.API_BASE_URL + "/patient/" + uuid + "/allergy" , data);
    }

    getAllergiesAllByPatient(uuid: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/patient/" + uuid + "/allergy");
    }

    deleteAllergie(id: number) {
        return this.http.delete("http://localhost:3000/vitauxList/" + id);
    }


    /// Demarrer Visit
    postVisit(data: any) {
        return this.http.post<any>(AppConstant.API_BASE_URL + "/visit" , data);
    }

    closeVisit(data: any, visitUUID: any) {
        return this.http.put<any>(AppConstant.API_BASE_URL + "/visit/" + visitUUID , data);
    }
    postRegimeARV(data: any) {
        return this.http.post<any>("http://localhost:3000/regimeARV/" , data);

    }

    getRegimeARV() {
        return this.http.get<any>("http://localhost:3000/regimeARV/");

    }

    deleteRgimeARV(id: number) {
        return this.http.delete("http://localhost:3000/regimeARV/" + id);
    }

    getPatientVisit(links: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/visit/" + links); 
    }

    getPatientActiveVisit(patientUUID: string) {
        return this.http.get<any>(AppConstant.API_BASE_URL + "/visit/patient/" + patientUUID);
    }


    //////////SETTINGS///////

    putSettings(data: any , id: number) {
        return this.http.put<any>("http://localhost:3000/settings/" + id , data);
    }


    getSettings() {
        return this.http.get<any>("http://localhost:3000/settings/");

    }

}
