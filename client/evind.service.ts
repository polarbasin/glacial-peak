import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Event } from './datatypes/event';

@Injectable()
export class EvindService {
  constructor (private _http: Http) {

  }
  getEvent(id) {
    console.log('worked', id);
    return this._http.get(`events/${id}`)
    .map(res => {
      console.log('res', res);
      return res.json();
    });
  }
}