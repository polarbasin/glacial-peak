import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Event } from './datatypes/event';

@Injectable()
export class EvindService {
  constructor (private _http: Http) {

  }
  getEvent(id) {
    return this._http.get(`events/${id}`)
    .map(res => {
      return res.json();
    });
  }
}