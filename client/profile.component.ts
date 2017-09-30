import { Component, OnInit, NgModule} from '@angular/core';
import { Event }        from './datatypes/event';
import { EventService } from './event.service';
import { NgFor, NgIf, NgModel } from '@angular/common';


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['profile.component.css'],
    providers: [EventService],
    directives: [NgFor, NgIf ]
})

export class ProfileComponent implements OnInit {
    errorMessage: any;
    profile: any;
    name: String;
    image: String;
    email: String;
    userId: String;
    events: any;
    

    constructor(public eventService:EventService) {
    }
    ngOnInit() {
        this.eventService.events.subscribe(
            events => this.events = events,
            error => console.error('error ' + error),
            () => console.log(this.events[0])
          );
        this.eventService.profile.subscribe(
            (profile)=> {
                console.log(profile);
                this.profile = profile;
                this.name = profile.facebook.displayName;
                this.image = profile.facebook.image;
                this.email = profile.facebook.email;
                this.userId = profile.facebook.id;
            },
            error => console.error('error ' + error),
            () => console.log('Completed!', this.profile)
        );
        console.log('Profile Initialized!');
    }

}

