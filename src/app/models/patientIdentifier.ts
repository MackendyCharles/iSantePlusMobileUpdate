import { IdentifierType } from "./identifier_type";
import { Locations } from "./locations";

export class PatientIdentifier{
    patient_identifier_id: number;
    patient_id: number;
    identifier: string;
    identifierType: string;
    preferred: string;
    location: string;
    creator: number;
    date_created: string;
    date_changed: string;
    changed_by: number;
    voided: string;
    voided_by: number;
    date_voided: string;
    void_reason: string;
    uuid: string;
}
