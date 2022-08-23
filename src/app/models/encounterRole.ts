import { User } from './user';
export class  EncounterRole{
    encounterRoleId:number;
    name:string;
    description:string;
    creator:User;
    dateCreated:Date;
    changedBy:User;
    dateChanged:Date;
    retired:number;
    retiredBy:number
    dateRetired:Date;
    retireReason:string;
    uuid:string;

}