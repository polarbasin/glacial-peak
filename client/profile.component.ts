import { Component } from '@angular/core';

@Component({
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
})

export class ProfileComponent {
    test = 'confirm'
}
