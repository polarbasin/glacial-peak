import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  providers: [EventService],
  selector: 'profile-button',
  template: `
  <div [hidden]="!loggedIn">
    <div class="login">
      <a routerLink="/profile">
        <button class="login-submit">
          Profile Page
        </button>
      </a>
    </div>
  </div>
  `
})

export class ProfileButtonComponent implements OnInit {
  loggedIn: any;
  profile: any;

  constructor(private http: EventService) {
    

  }
  
  ngOnInit() {
    console.log('nginit');
    this.http.profile.subscribe(response => {
      console.log('function ran')
      console.log(response);
      if (response === false) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
    
  }
}
