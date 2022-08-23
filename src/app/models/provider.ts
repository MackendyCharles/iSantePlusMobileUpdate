import { User } from './user';
export class Provider{
    providerId:number;
    personId:number;
    name:string;
    identifier:string;
    creator:User;
    dateCreated:Date;
    changedBy:User;
    dateChanged:Date;
    retired:string;
    retiredBy:User;
    dateRetired:Date;
    retireReason:string;
    uuid:StreamPipeOptions;
    providerRoleId:number;

}