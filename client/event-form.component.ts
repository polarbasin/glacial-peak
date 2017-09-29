// template for event-form. No functionality added to event services.
import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { EvindService } from './evind.service';
@Component({
    selector: 'event-form',
    providers: [EvindService],
    template: `
      <form [formGroup]="form" (ngSubmit)="postEvent()" class="form-horizontal" action="/api/events" method="post">
        <fieldset>

        <!-- Form Name -->
        <legend>Add your own event</legend>


        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="title">Event Name</label>  
          <div class="col-md-5">
          <input formControlName="title" id="title" name="title" type="text" placeholder="My event" class="form-control input-md">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="eventDate">Event Date</label>  
          <div class="col-md-5">
          <input formControlName="eventDate" id="eventDate" name="eventDate" type="date" placeholder="" class="form-control input-md">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="location">Event Location</label>  
          <div class="col-md-5">
          <input formControlName="location" id="location" name="location" type="text" placeholder="Location" class="form-control input-md">
            
          </div>
        </div>

        <!-- Textarea -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="description">Description</label>
          <div class="col-md-3">                     
            <textarea formControlName="description" class="form-control" id="description" placeholder="..." name="description"></textarea>
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="link">Event Link</label>  
          <div class="col-md-5">
          <input formControlName="link" id="link" name="link" type="text" placeholder="www.event.com" class="form-control input-md">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="imgUrl">Image Link</label>  
          <div class="col-md-5">
          <input formControlName="imgUrl" id="imgUrl" name="imgUrl" type="text" placeholder="www.event.com/picture.jpg" class="form-control input-md">
            
          </div>
        </div>


        <!-- Button -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="submit"></label>
          <div class="col-md-4">
            <button id="submit" name="submit" type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>

        </fieldset>
      </form>` 
})

export class EventFormComponent {
   form = new FormGroup({
    title: new FormControl(),
    location: new FormControl(),
    link: new FormControl(),
    eventDate: new FormControl(),
    description: new FormControl(),
    imgUrl: new FormControl(),
  });
   constructor(private _httpService: EvindService) {

   }
  postEvent() {
    let eventToSend = {
      title: this.form.value.title,
      location: this.form.value.location,
      link: this.form.value.link,
      eventDate: this.form.value.eventDate,
      description: this.form.value.description,
      imgUrl: this.form.value.imgUrl
    }
    console.log(eventToSend);
    this._httpService.postEvent(eventToSend).subscribe((res) => {
      console.log('event posted');
    })
  }
 }