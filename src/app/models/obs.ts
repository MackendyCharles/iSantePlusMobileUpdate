import { User } from './user';
export class Obs{
    obsId: number;
    personId: number;
    conceptId: number;
    encounterId: number;
    orderId: number;
    obsDatetime:Date;
    locationId: number;
    obsGroupId: number;
    accessionNumber:string;
    valueGroupId: number;
    valueCoded:number;
    valueCoded_nameId: number;
    valueDrug:number;
    valueDatetime:Date;
    valueNumeric:number;
    valueModifier:string;
    valueText:string;
    valueComplex:string;
    comments:string;
    creator: User;
    dateCreated: Date;
    voided:string;
    voidedBy:User;
    dateVoided:Date;
    voidReason:string;
    uuid:string;
    previousVersion:number;
    formNamespaceAndPath:string;
}

export class ObsRequest{
    person:string;
    concept:string;
    obsDatetime:Date;
    value:any;
    encounter: string;
    obs: string;
    comment: string;
}

export class ObsGroupRequest{
    person:string;
    concept:string;
    obsDatetime:Date;
    value:string;
    groupMembers:ObsRequest[];
}

export class ObsGroupRequestValueNumber{
    person:string;
    concept:string;
    obsDatetime:Date;
    value:string;
    groupMembers:ObsRequest[];
}

export class ObsDemarrerVisit{
    patient:string;
    visitType:string;
    startDatetime: Date;
    stopDatetime: Date;
    location:string;
}

export  class ObsCloseVisit{
    stopDatetime: Date;
}
