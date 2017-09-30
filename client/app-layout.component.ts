import { Component, OnInit }    from '@angular/core';
import { Router }       from '@angular/router';
import { NgFor }        from '@angular/common';
import { Event }        from './datatypes/event';
import { EventService } from './event.service';

@Component({
  selector: 'app-layout',
  template:
  `<div><login-button></login-button></div>
    <div><add-event-button></add-event-button></div>
    <div><profile-button></profile-button></div>
    <div class="col-md-12" id="header"><h1>BORED<span class="question">?</span></h1>
    <h4 class="subtitle">A local event aggregator</h4>
  </div>
    <div class="container">
      <div class="events">
        <div class="row">
          <div class="col-md-4" id="event" *ngFor="let event of events; let i = index">
            <div class="details">
              <a target="_blank" href="{{event.link}}">
                <h3>{{ event.title }}</h3>
              </a>
              <img src="{{ event.imgUrl }}"><br>
              <a [routerLink]="['/eview/', event._id]">View this Event</a>
            </div>
          </div>
        </div>
      </div>
   </div>`,
  directives: [ NgFor ]
})

export class AppLayoutComponent implements OnInit {  
    public errorMessage: any;
    public events: any;

  constructor(private eventService:EventService) {
     eventService.events.subscribe(
         events => this.events = events,
         error => console.error('error ' + error),
         () => console.log('Completed!')
       );
  }

  ngOnInit() {
    console.log('Initialized!');
  }

}
