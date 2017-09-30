import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'login-button',
  template: `
  <div [hidden]="loggedIn">
    <div class="login">
      <a href="/login/facebook">
        <button class="login-submit">
          Login with facebook
        </button>
      </a>
    </div>
  </div>
   `
})

export class LoginButtonComponent implements OnInit {

  loggedIn: any;
  profile: any;

  constructor(private http: EventService) { }

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
