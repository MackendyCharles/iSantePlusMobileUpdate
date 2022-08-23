import { User } from './user';
export class EncounterType{
    encounterTypeId:number;
    name:string;
    description:string;
    creator:User;
    dateCreated:Date;
    retired:string;
    retiredBy:number;
    date_Retired:Date;
    retireReason:string;
    uuid:string;
    editPrivilege:string;
    viewPrivilege:string;
    changedBy:User;
    dateChanged:Date;

}