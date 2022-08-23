import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import {Setting} from './setting';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbSettingService {

  private storage: SQLiteObject;
  settingList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dbIsante.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
   }

   dbState() {
    return this.isDbReady.asObservable();
  }

  fetchSetting(): Observable<Setting[]> {
    return this.settingList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dbSetting.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSettings();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    // Get list
  getSettings(){
    return this.storage.executeSql('SELECT * FROM settingTbl', []).then(res => {
      let items: Setting[] = [];
      
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          
          items.push({ 
            id: res.rows.item(i).id,
            locations: res.rows.item(i).locations,  
            ipaddress: res.rows.item(i).ipaddress,
            port: res.rows.item(i).port,
            protocol: res.rows.item(i).protocol,
            api: res.rows.item(i).api,
           });
        }
      }
      this.settingList.next(items);
    });
  }

   // Add
   addSetting(locations, ipaddress, port, protocol, api) {
    let data = [locations, ipaddress, port, protocol, api];
    return this.storage.executeSql('INSERT INTO settingTbl (artist_name, song_name) VALUES (?, ?, ?. ?)', data)
    .then(res => {
      this.getSettings();
    });
  }

  // Get single object
  getSetting(id): Promise<Setting> {
    return this.storage.executeSql('SELECT * FROM settingTbl WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        locations: res.rows.item(0).locations,  
            ipaddress: res.rows.item(0).ipaddress,
            port: res.rows.item(0).port,
            protocol: res.rows.item(0).protocol,
            api: res.rows.item(0).api,
      }
    });
  }

  // Update
  updateSetting(id, setting: Setting) {
    let data = [setting.locations, setting.ipaddress, setting.port, setting.protocol, setting.api];
   // alert(id);
    return this.storage.executeSql('UPDATE settingTbl SET locations = ?, ipaddress = ? , port = ? , protocol = ? , api = ? WHERE id =' + id , data)
    .then(data => {
      this.getSettings();
    })
  }
  // Delete
  deleteSetting(id) {
    return this.storage.executeSql('DELETE FROM settingTbl WHERE id = ?', [id])
    .then(_ => {
      this.getSettings();
    });
  }


    //ORDONNANCE FUNCTIONS

    // Add
    addOrdonnance(artist_name, song_name) {
        let data = [artist_name, song_name];
        return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
            .then(res => {
               // this.getSongs();
            });
    }



}
