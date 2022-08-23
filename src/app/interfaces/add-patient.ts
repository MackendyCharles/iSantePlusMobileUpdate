import { PatientIdentifier } from './../models/patientIdentifier';
import { PersonAttribute } from './../models/personAttribute';
import { PersonAddress } from './../models/personAddress';
import { PersonName } from './../models/personName';
import { Person } from './../models/person';
export class  AddPatient {
    person: Person;
    identifiers: PatientIdentifier[];
    
}