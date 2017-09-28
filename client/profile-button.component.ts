import { Component } from '@angular/core';

@Component({
  selector: 'profile-button',
  template: `
  <div class="login">
  <a routerLink="/profile">
    <button class="login-submit">
      Profile Page
    </button>
  </a>
</div>
   `
})

export class ProfileButtonComponent { }
