import { EncounterRole } from './encounterRole';
import { User } from './user';
export class EncounterProvider{
    encounterProviderId: number;
    encounterId: number;
    providerId: number;
    encounterRoleId: number;
    creator: User;
    dateCreated: Date;
    changedBy: User;
    dateChanged: Date;
    voided: string;
    dateVoided:Date;
    voidedBy:User;
    voidReason:string;
    uuid: string;
}

export class EncounterProviderExport{
    provider : string;
    encounterRole:string;
}