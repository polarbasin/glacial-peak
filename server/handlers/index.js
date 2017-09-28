const Event = require('../models/Event.js');
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
    console.log(req);
    let event = req.body;
    console.log('user', req.user);
    console.log('event', event);
    event.attending = [];
    // console.log(event);
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
};
