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
  eventDesc: string;
  showChatText: string;
  showChat: boolean;

  constructor() {
    this.eventName = '';
    this.eventDate = '';
    this.eventLocation = '';
    this.eventDesc = '';
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
