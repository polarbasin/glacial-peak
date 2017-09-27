import { Injectable }        from '@angular/core';
import { Http, Response }    from '@angular/http';
import { Event }             from './datatypes/event';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  public eventsUrl = 'api/events';  // URL to web api
  public events: any;
<<<<<<< HEAD
  public profileUrl = 'profileInfo'; //URL to facebook api
=======
  public profileUrl = ''; //URL to facebook api
>>>>>>> Changed event service method in profile
  public profile: any;

  constructor(public http: Http) {
    this.events = http.get(this.eventsUrl)
                      .map(response => response.json());
                      
    this.profile = http.get(this.profileUrl)
                      .map(response => response.json()); 

  }

 
}

