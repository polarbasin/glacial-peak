const Event = require('../models/Event.js');
const Message = require('../models/Message');
const saveEvent = require('../controllers/eventcontroller');

module.exports = {
  getEvents: (req, res) => {
    Event.find((err, event) => {
      if (err) {
        res.send(err);
      } else {
        res.send(event);
      }
    });
  },
  postEvent: (req, res) => {
    // console.log(req);
    let event = req.body;
    console.log('user', req.user);
    console.log('event', event);
    saveEvent(event);
    res.redirect('/');
  },
  isAuthenticated: (req, res, next) => {
    let not = req.isAuthenticated() ? '' : 'NOT ';
    console.log(`User is ${not}authenticated`);
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
      return next();
    }
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
  },
  addToAttending: (req, res) => {
    // console.log('made it', req.body);
    // res.status(201).send(req.body);
    const name = req.body.name;
    const event = req.body.event;
    let currentAttending = req.body.event.attending;
    if (currentAttending.indexOf(name) === -1) {
      Event.findOneAndUpdate({ title: event.title }, { attending: currentAttending.concat(name) }, (err, event) => {
        if (err) {
          console.log('error updating attending:', err);
          res.status(404).send('not found or updated');
        } else {
          res.status(201).send(event);
        }
      });
    }
  },
  addMessage: (req, res, next) => {
    console.log(req.body);
    let incomingMessage = req.body;
    Message.create({
      handle: incomingMessage.handle,
      message: incomingMessage.message,
      event: incomingMessage.event,
    }, (err, message) => {
      if (err) {
        console.log(err);
        res.status(500).send('error posting message');
      } else {
        res.status(201).send(message);
      }
    });
  },
  getMessages: (req, res) => {
    Message.find({}, (err, messages) => {
      if (err) {
        console.log(err);
        res.status(500).send('error getting messages');
      } else {
        res.status(200).send(messages);
      }
    });
  }
};
