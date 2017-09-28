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
const common_1 = require('@angular/common');
let ProfileComponent = class ProfileComponent {
    constructor(eventService) {
        this.eventService = eventService;
    }
    ngOnInit() {
        this.eventService.events.subscribe(events => this.events = events, error => console.error('error ' + error), () => console.log(this.events[0]));
        this.eventService.profile.subscribe((profile) => {
            this.profile = profile;
            this.name = profile.facebook.displayName;
            this.image = profile.facebook.image;
            this.email = profile.facebook.email;
            this.userId = profile.facebook.id;
        }, error => console.error('error ' + error), () => console.log('Completed!', this.profile));
        console.log('Profile Initialized!');
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
        styleUrls: ['profile.component.css'],
        providers: [event_service_1.EventService],
        directives: [common_1.NgFor, common_1.NgIf]
    }), 
    __metadata('design:paramtypes', [event_service_1.EventService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map