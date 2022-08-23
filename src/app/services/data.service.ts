import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
  })

export class DataService {

    url_ = './assets/inputFile/countries.json';

    constructor(private http: HttpClient){}

    getAll(): any {
        return this.http.get<any>(this.url_);
    }
    
}
