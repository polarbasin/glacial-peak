import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvindService } from './evind.service';
import { EventService } from './event.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
// import { AttEvService } from './attendevent.service';

// import { Http } from '@angular/http';
// import { EventService } from './event.service';
// import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'eview',
  // directives: [ROUTER_DIRECTIVES],
  providers: [EvindService, EventService],
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
     <ul>
       <li *ngFor="let person of attending">{{person}}</li>
     </ul>
    <div class="attendlist"></div>
    <button (click)="handleAttend()">I'm interested in this event!</button>
  </div>
      <div class="notification">
        <button (click)="notiForm()">Enable Notifications for this Event</button>
        <div id="notiForm" *ngIf="shownotiForm">
          <form [formGroup]="appointment" (ngSubmit)="newAppt(appointment.value)">
            Enter the phone number for which you would like to receive SMS notifications:<br>
            <input formControlName="phoneNumber" type="text" placeholder="Phone Number"/> 
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

  <button (click)="toggleChat()">{{showChatText}}</button>
  <div *ngIf="showChat">
    <div id="chatroom">
      <div class="chatheader">Event Chat Room</div><br>
        <div id="chat-window">
          <div id="output">
          <ul>
            <li *ngFor="let message of messages">
              <b>{{message.handle}}</b>: {{message.message}}
            </li>
          </ul>
          </div>
          <div id="feedback"></div>
        </div>
        <form [formGroup]="form" (ngSubmit)="postMessage()">
          <input formControlName="handle" placeholder="Handle">
          <input formControlName="message" placeholder="Message">
          <button type="submit">Send</button>
        </form>
      </div>
  </div>
  <div class="entryBackLink"><a routerLink="/">Back</a></div>
</div> `
})

export class EviewComponent {

  id: string;
  eventDate: string;
  eventName: string;
  eventLocation: string;
  eventLink: string;
  eventPict: string;
  eventDesc: string;
  eventPostBy: string;
  attending: string[];
  showChatText: string;
  showChat: boolean;
  shownotiForm: boolean;
  getData: any;
  profile: any;
  name: string;
  image: string;
  userID: string;
  messages: any[];
  form = new FormGroup({
    handle: new FormControl(),
    message: new FormControl(),
  })



  appointment = new FormGroup({
    phoneNumber: new FormControl('phoneNumber')
  });

  constructor(private route: ActivatedRoute, private _httpService: EvindService, public eventService: EventService) {
    this.id = route.snapshot.params['id'];
    this.showChatText = 'Go to event chat room';
    this.showChat = false;
    this.shownotiForm = false;
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
      this.attending = data.attending;
    }, error => {
      console.error(error);
    }, () => {
      console.log('GET request complete');
    });
  }
  attEvent(user) {
    this._httpService.attendEvent(user).subscribe(() => {
      console.log('Successful POST request');
    }, error => {
      console.error(error);
    }, () => {
      console.log('Request complete');
    });
  }
  ngOnInit() {
    this.onTestGet(this.id);
    this.eventService.profile.subscribe(profile => {
      this.userID = profile.facebook.id;
      this.profile = profile;
      this.name = profile.facebook.displayName;
      this.image = profile.facebook.image;
    }, error => {
      console.error(error);
    }, () => {
      console.log('complete');
    })
    

    
  }
  handleAttend() {
    if (this.name) {
      this.attEvent({ name: this.name, event: this.getData });
      this.onTestGet(this.id);
    }
  }
  getDate(event) {
    if (!event.eventDate) {
      return;
    }
    const timeArray = event.eventDate.split('-');
    const year = parseInt(timeArray[0]);
    const month = parseInt(timeArray[1]);
    const day = parseInt(timeArray[2]);
    const eventDate = new Date(year, month - 1, day);
    console.log(eventDate);
    // const eventTimeMs = eventDate.valueOf();
    // const currentTimeMs = Date.now();
    // const timeUntilEvent = eventTimeMs - currentTimeMs;
    // // 1 hour in ms is 3600000
    // // system will notify user at 5PM day before event
    // const timeUntilNotification = timeUntilEvent - (3600000 * 7);
    // // if it is after 5PM day before event, immediately send notification
    // if (timeUntilNotification < 0) {
    //   sendNotification(event);
    // } else {
    //   //set to 5 PM day before event
    //   setTimeout(sendNotification, timeUntilNotification, event);
    // }
    // console.log(`notification set for: ${timeUntilNotification / 3600000} hours from now`);
  }
  newAppt() {
    console.log(this.appointment.get('phoneNumber').value);
    console.log(this.getData);
    console.log(this.getDate(this.getData));
    // const phone = this.appointment.get('phoneNumber').value;
    // const apptObj = {
    //   name: this.eventName,
    //   phoneNumber: phone
    // };
    // // Send the phone number to the endpoint for posting an appointment.
    // this._httpService.makeAppt(apptObj).subscribe(() => {
    //   console.log('Successful POST request');
    // }, error => {
    //   console.error(error);
    // }, () => {
    //   console.log('Request complete');
    // });
  }
  toggleChat() {
    if (this.showChat === true) {
      this.showChat = false;
      this.showChatText = 'Go to event chat room';
    } else {
      this.showChat = true;
      this.showChatText = 'Hide event chat room';
      this.getMessages();
    }
  }
  notiForm() {
    if (this.shownotiForm === true) {
      this.shownotiForm = false;
    } else {
      this.shownotiForm = true;
    }
  }

  getMessages() {
    this._httpService.getMessages().subscribe((messages) => {
      let mapped = messages.filter((message) => {
        return message.event === this.eventName;
      })
      this.messages = mapped;
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('messages received,', this.messages);
    })
  }
  
  postMessage() {
    console.log(this.form.get('handle'), this.form.get('name'));
    let messageToSend = {
      handle: this.form.value.handle,
      message: this.form.value.message,
      event: this.eventName,
    }
    this.messages.push(messageToSend);
      this._httpService.postMessage(messageToSend).subscribe(() => {
      console.log('Successful POST request');
    }, error => {
      console.error(error);
    }, () => {
      console.log('Request complete');
    });
  }
  
}
