"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const event_service_1 = require('./event.service');
let ProfileComponent = class ProfileComponent {
    constructor(eventService) {
        this.eventService = eventService;
        eventService.profile.subscribe(profile => this.profile = profile, error => console.error('error ' + error), () => console.log('Completed!'));
    }
    ngOnInit() {
        console.log('Profile Initialized!');
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        template: `
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <div id=profileHeader>
      <div class="fb-profile">
      <div >    
      <img align="left" class="fb-image-lg" src="http://lorempixel.com/850/280/nightlife/5/" alt="Profile image example"/>
          <img align="left" class="fb-image-profile thumbnail" src="http://lorempixel.com/180/180/people/9/" alt="Profile image example"/>
         
      </div>
      <h1>Eli Macy</h1>
     
  </div> <!-- /container -->  
  
  <div class="move">
  <div>
  <h3>DOB:</h3>
  <h3>City:</h3>
  <h3>Job:</h3>
  
  </div>
  
  </div>
   

  `,
        styleUrls: ['profile.component.css']
    }), 
    __metadata('design:paramtypes', [event_service_1.EventService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map