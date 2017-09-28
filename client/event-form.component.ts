// template for event-form. No functionality added to event services.
import { Component } from '@angular/core';

@Component({
    selector: 'event-form',
    template: `
      <form class="form-horizontal" action="/api/events" method="post">
        <fieldset>

        <!-- Form Name -->
        <legend>Add your own event</legend>


        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="title">Event Name</label>  
          <div class="col-md-5">
          <input id="title" name="title" type="text" placeholder="My event" class="form-control input-md">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="eventDate">Event Date</label>  
          <div class="col-md-5">
          <input id="eventDate" name="eventDate" type="date" placeholder="" class="form-control input-md">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="imgUrl">Event Location</label>  
          <div class="col-md-5">
          <input id="imgUrl" name="imgUrl" type="text" placeholder="Location" class="form-control input-md">
            
          </div>
        </div>

        <!-- Textarea -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="description">Description</label>
          <div class="col-md-3">                     
            <textarea class="form-control" id="description" placeholder="..." name="description"></textarea>
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="link">Event Link</label>  
          <div class="col-md-5">
          <input id="link" name="link" type="text" placeholder="www.event.com" class="form-control input-md">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="imgUrl">Image Link</label>  
          <div class="col-md-5">
          <input id="imgUrl" name="imgUrl" type="text" placeholder="www.event.com/picture.jpg" class="form-control input-md">
            
          </div>
        </div>


        <!-- Button -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="submit"></label>
          <div class="col-md-4">
            <button id="submit" name="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>

        </fieldset>
      </form>` 
})

export class EventFormComponent { }