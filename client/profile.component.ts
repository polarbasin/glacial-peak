import { Component, OnInit, NgModule } from '@angular/core';
import { Event }        from './datatypes/event';
import { EventService } from './event.service';
import { EvindService } from './evind.service';
import { NgModel, NgFor } from '@angular/common';


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['profile.component.css'],
    providers: [EventService, EvindService],
    directives: [ NgModel, NgFor ]
})

export class ProfileComponent implements OnInit {
    errorMessage: any;
    profile: any;
    name: String;
    image: String;
    email: String;
    events: any;

<<<<<<< HEAD
    constructor(public eventService:EventService) {
    }
    ngOnInit() {
        this.eventService.events.subscribe(
            events => this.events = events,
            error => console.error('error ' + error),
            () => console.log('Completed!')
          );
        this.eventService.profile.subscribe(
            (profile)=> {
                this.profile = profile;
                this.name = profile.facebook.displayName;
                this.image = profile.facebook.image;
                this.email = profile.facebook.email;
            },
=======
    constructor(private eventService:EventService) {
        eventService.profile.subscribe(
            profile => this.profile = profile,
>>>>>>> Changed event service method in profile
            error => console.error('error ' + error),
            () => console.log('Completed!', this.profile)
        );
        console.log('Profile Initialized!');
    }

}

