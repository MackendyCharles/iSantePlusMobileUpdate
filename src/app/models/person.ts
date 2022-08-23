import { PersonAttribute } from './personAttribute';
import { PersonAddress } from './personAddress';
import { PersonName } from './personName';
export class Person {
    names: PersonName[];
    person_id: number;
    gender: string;
    birthdate: string;
    birthdate_estimated: string;
    dead: string;
    death_date: string;
    cause_of_death: number;
    creator: number;
    date_created: string;
    changed_by: number;
    date_changed: string;
    voided: string;
    voided_by: number;
    date_voided: string;
    void_reason: string;
    uuid: string;
    deathdate_estimated: string;
    birthtime: string;
    addresses: PersonAddress[];
    attributes: PersonAttribute[];
}
