import { EncounterProvider, EncounterProviderExport } from "../models/encounterProvider";
import { Obs, ObsDemarrerVisit, ObsGroupRequest, ObsGroupRequestValueNumber } from "../models/obs";
import { AddPatient } from "./add-patient";

export class AddEncounter{
    encounterDatetime: Date;
    patient: AddPatient[];
    encounterType:string;
    location:string;
    encounterProviders:EncounterProviderExport[];
    obs:ObsGroupRequest[];
}

export class AddEncounterVitaux{
    encounterDatetime: Date;
    patient: string;
    encounterType:string;
    location:string;
    encounterProviders:EncounterProviderExport[];
    obs:ObsGroupRequestValueNumber[];
}

export class AddEncounterOrdonnance{
    encounterDatetime: Date;
    patient: string;
    encounterType:string;
    location:string;
    encounterProviders:EncounterProviderExport[];
    visit : ObsDemarrerVisit;
    obs:ObsGroupRequestValueNumber[];
}

export class AddEncounterSspPreCons{
    encounterDatetime: Date;
    patient: string;
    encounterType:string;
    location:string;
    encounterProviders:EncounterProviderExport[];
    visit : ObsDemarrerVisit;
    obs:ObsGroupRequestValueNumber[];
}




// import { EncounterProvider, EncounterProviderExport } from "../models/encounterProvider";
// import { Obs, ObsDemarrerVisit, ObsGroupRequest, ObsGroupRequestValueNumber } from "../models/obs";
// import { AddPatient } from "./add-patient";
//
// export class AddEncounter{
//     encounterDatetime: Date;
//     patient: AddPatient[];
//     encounterType:string;
//     location:string;
//     encounterProviders:EncounterProviderExport[];
//     obs:ObsGroupRequest[];
// }
//
// export class AddEncounterVitaux{
//     encounterDatetime: Date;
//     patient: string;
//     encounterType:string;
//     location:string;
//     encounterProviders:EncounterProviderExport[];
//     obs:ObsGroupRequestValueNumber[];
// }
//
// export class AddEncounterOrdonnance{
//     encounterDatetime: Date;
//     patient: string;
//     encounterType:string;
//     location:string;
//     encounterProviders:EncounterProviderExport[];
//     visit : ObsDemarrerVisit;
//     obs:ObsGroupRequestValueNumber[];
// }
