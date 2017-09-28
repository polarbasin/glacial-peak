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
const router_1 = require('@angular/router');
const evind_service_1 = require('./evind.service');
// import { Http } from '@angular/http';
// import { EventService } from './event.service';
// import { ROUTER_DIRECTIVES } from '@angular/router';
let EviewComponent = class EviewComponent {
    constructor(route, _httpService) {
        this.route = route;
        this._httpService = _httpService;
        this.id = route.snapshot.params['id'];
        this.showChatText = 'Go to event chat room';
        this.showChat = false;
        // this.eventName = this.getData.title;
        // this.eventDate = 'Friday, September 29th, 2017 5:00PM';
        // this.eventLocation = 'Operation Spark - 748 Camp St New Orleans, LA 70130';
        // this.eventPict = 'https://i.imgur.com/2TBGE8r.jpg';
        // this.eventLink = '';
        // this.eventDesc = 'Team FuzzyLobster has been working all week to improve the nolaBored app, come see what they changed!';
        // this.attending = ['Aaron', 'Jake', 'Violet'];
    }
    onTestGet(id) {
        this._httpService.getEvent(id).subscribe(data => {
            console.log(data);
            this.getData = data;
            this.eventName = data.title;
            this.eventDate = data.eventDate;
            this.eventPict = data.imgUrl;
            this.eventLink = data.link;
            this.eventDesc = data.description;
            this.eventPostBy = data.author;
            this.eventLocation = data.location;
        }, error => {
            console.error(error);
        }, () => {
            console.log('GET request complete');
        });
    }
    ngOnInit() {
        this.onTestGet(this.id);
    }
    toggleChat() {
        if (this.showChat === true) {
            this.showChat = false;
            this.showChatText = 'Go to event chat room';
        }
        else {
            this.showChat = true;
            this.showChatText = 'Hide event chat room';
        }
    }
};
EviewComponent = __decorate([
    core_1.Component({
        selector: 'eview',
        // directives: [ROUTER_DIRECTIVES],
        providers: [evind_service_1.EvindService],
        template: `
    <div id="eventview">
      <div class="eventHeader">{{eventName}}</div>
      <div class="eventPict"><img src={{eventPict}}></div>
      <div class="eventLink"><a href={{eventLink}} target="_blank">View More Info</a></div>
      <div class="eventInfo">
        <span class="eventDate"><b>Date:</b> {{eventDate}}</span><br>
        <span class="eventLocation"><b>Location:</b> {{eventLocation}}</span>
      </div>
      <div class="eventDesc">{{eventDesc}}</div>
      <div class="postedBy"><b>Event Posted By:</b> {{eventPostBy}}</div>
      <div class="attending">
        <b>People Attending this Event:</b>
        <div class="attendlist"></div>
        <button>I'm interested in this event!</button>
      </div>
      <button (click)="toggleChat()">{{showChatText}}</button>
      <div *ngIf="showChat">
        <div id="chatroom">
          <div class="chatheader">Event Chat Room</div><br>
          <div id="chat-window">
            <div id="output"></div>
            <div id="feedback"></div>
          </div>
          <input id="handle" type="text" placeholder="Handle" />
          <input id="message" type="text" placeholder="Message" />
          <button id="send">Send</button>
        </div>
      </div>
      <div class="entryBackLink"><a routerLink="/">Back</a></div>
    </div> `
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, evind_service_1.EvindService])
], EviewComponent);
exports.EviewComponent = EviewComponent;
//# sourceMappingURL=eview.component.js.map