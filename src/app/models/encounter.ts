import { Patient } from './patient';
import { User } from './user';
export class Encounter{
    encounterId:number;
    encounterType:number;
    patientId:Patient;
    locationId:number;
    formId:number;
    encounterDatetime:Date;
    creator:User;
    dateCreated:Date;
    voided:string;
    voidedBy:number;
    dateVoided:Date;
    voidReason:string;
    changedBy:User;
    dateChanged:Date;
    visitId:number;
    uuid:string;

}

export class EncounterRequest{
    encounterId:number;
    encounterType:number;
    patientId:number;
    locationId:number;
    formId:number;
    encounterDatetime:Date;
    creator:User;
    dateCreated:Date;
    voided:string;
    voidedBy:number;
    dateVoided:Date;
    voidReason:string;
    changedBy:User;
    dateChanged:Date;
    visitId:number;
    uuid:string;

}