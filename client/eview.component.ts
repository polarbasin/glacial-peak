import { Component } from '@angular/core';
// import { Http } from '@angular/http';
// import { EventService } from './event.service';
// import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'eview',
  // directives: [ROUTER_DIRECTIVES],
  // providers: [EventService],
  template: `
    <div id="eventview">
      <div class="eventHeader">{{eventName}}</div>
      <div class="eventPict"><img src={{eventPict}}></div>
      <div class="eventInfo">
        <span class="eventDate">{{eventDate}}</span><br>
        <span class="eventLocation">{{eventLocation}}</span>
      </div>
      <div class="eventDesc">{{eventDesc}}</div>
      <div class="attenting">
      <b>People attending this event:</b><br>
        <ul>
        <li *ngFor="let person of attending">{{person}}</li>
        </ul>
      </div>
      <button (click)="toggleChat()">{{showChatText}}</button>
      <div *ngIf="showChat">
        Event Chat Room
      </div>
    </div>
  `
})

export class EviewComponent { 

  eventDate: string;
  eventName: string;
  eventLocation: string;
  eventLink: string;
  eventPict: string;
  eventDesc: string;
  attending: string[];
  showChatText: string;
  showChat: boolean;

  constructor() {
    this.eventName = 'Presenting the improved nolaBored';
    this.eventDate = 'Friday, September 29th, 2017 5:00PM';
    this.eventLocation = 'Operation Spark - 748 Camp St New Orleans, LA 70130';
    this.eventPict = 'https://i.imgur.com/2TBGE8r.jpg';
    this.eventLink = '';
    this.eventDesc = 'Team FuzzyLobster has been working all week to improve the nolaBored app, come see what they changed!';
    this.attending = ['Aaron', 'Jake', 'Violet'];
    this.showChatText = 'Go to event chat room';
    this.showChat = false;
  }
  toggleChat() {
    if (this.showChat === true) {
      this.showChat = false;
      this.showChatText = 'Go to event chat room';
    } else {
      this.showChat = true;
      this.showChatText = 'Hide event chat room';
    }
  }

}
