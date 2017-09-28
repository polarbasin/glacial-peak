require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const handlers = require('./handlers');
const rss = require('./rss.js');
const fbAuth = require('./config/facebook_passport');
const socket = require('socket.io');
const path = require('path');
require('dotenv').config();
require('./dbConnect');
require('./config/passport')(passport);

// Models
const Event = require('../server/models/Event');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// auth
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// todo  move to router page
app.use('/', express.static('client/')); 

app.use('/node_modules', express.static('node_modules/'));

app.use('/client/index.js', express.static('client/index.js'));
app.use('/client/app.module.js', express.static('client/app.module.js'));
app.use('/client/app.routes.js', express.static('client/app.routes.js'));
app.use('/client/login-button.component.js', express.static('client/login-button.component.js'));
app.use('/client/add-event-button.component.js', express.static('client/add-event-button.component.js'));
app.use('/client/login.component.js', express.static('client/login.component.js'));
app.use('/client/event.service.js', express.static('client/event.service.js'));
app.use('/client/event-form.component.js', express.static('client/event-form.component.js'));
app.use('/client/app.component.js', express.static('client/app.component.js'));
app.use('/client/app-layout.component.js', express.static('client/app-layout.component.js'));

app.use('/client/eview.component.js', express.static('client/eview.component.js'));
app.use('/client/evind.service.js', express.static('client/evind.service.js'));

app.use('/client/rxjs-operators.js', express.static('client/rxjs-operators.js'));
app.use('/client/datatypes/event.js', express.static('client/datatypes/event.js'));

// Fuzzy Lobster Added component routes
app.use('/client/profile.component.js', express.static('client/profile.component.js'));
app.use('/client/profile-button.component.js', express.static('client/profile-button.component.js'));


// facebook auth
app.get('/login/facebook',
  passport.authenticate('facebook'));

app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', fbAuth.config));

// post events to page
app.route('/api/events')
  .get(handlers.getEvents)
  .post(handlers.postEvent);
  // .post(handlers.isAuthenticated, handlers.postEvent);

app.get('/profileInfo', (req, res) => {
  res.send(req.user);
});

const port = process.env.PORT || 4657;

//these lines will parse the information out of the file where we load the rss fead
const feed = 'http://www.bestofneworleans.com/gambit/Rss.xml?section=1222783';
rss.requestRSS(feed);
// rss.request();

// Get data from database

// Get all events
app.get('/events', (req, res) => {
  Event.find((err, event) => {
    if (err) {
      console.error(err);
      return res.send(err);
    } else {
      res.json(event);
    }
  });
});

// Get events by id
app.get('/events/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.error(err);
      return res.send(err);
    } else {
      res.json(event);
    }
  });
});

//add user to event
app.post('/adduser', handlers.addToAttending);
  // .post(handlers.addToAttending);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// Socket
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection');
  console.log('socket', socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

