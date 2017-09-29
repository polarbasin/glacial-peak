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
// const socket = require('socket.io');
const path = require('path');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const router = new express.Router();

require('./dbConnect');
require('./config/passport')(passport);

// Models

const Event = require('../server/models/Event');
const Appointment = require('../server/models/Appointment');

const Message = require('./models/Message');


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

// Get time zones
const getTimeZones = () => {
  return momentTimeZone.tz.names();
};

// Appointments
// GET: /appointments
router.get('/', function (req, res, next) {
  Appointment.find()
    .then(function (appointments) {
      res.render('appointments/index', { appointments: appointments });
    });
});

// GET: /appointments/create
router.get('/create', function (req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({
      name: '',
      phoneNumber: '',
      notification: '',
      timeZone: '',
      time: ''
    })
  });
});

// POST: /appointments
router.post('/', function (req, res, next) {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  const appointment = new Appointment({
    name: name,
    phoneNumber: phoneNumber,
    notification: notification,
    timeZone: timeZone,
    time: time
  });
  appointment.save()
    .then(function () {
      res.redirect('/');
    });
});

// GET: /appointments/:id/edit
router.get('/:id/edit', function (req, res, next) {
  const id = req.params.id;
  Appointment.findOne({ _id: id })
    .then(function (appointment) {
      res.render('appointments/edit', {
        timeZones: getTimeZones(),
        appointment: appointment
      });
    });
});

// POST: /appointments/:id/edit
router.post('/:id/edit', function (req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  Appointment.findOne({ _id: id })
    .then(function (appointment) {
      appointment.name = name;
      appointment.phoneNumber = phoneNumber;
      appointment.notification = notification;
      appointment.timeZone = timeZone;
      appointment.time = time;

      appointment.save()
        .then(function () {
          res.redirect('/');
        });
    });
});

// POST: /appointments/:id/delete
router.post('/:id/delete', function (req, res, next) {
  const id = req.params.id;

  Appointment.remove({ _id: id })
    .then(function () {
      res.redirect('/');
    });
});

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

// Add to message board
app.post('/messages', handlers.addMessage);

app.get('/messages', handlers.getMessages);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});




// Socket (Eventually...)
// const io = socket(server);

// io.on('connection', (socket) => {
//   console.log('made socket connection');
//   console.log('socket', socket.id);
//   socket.on('open', (data) => {
//     Message.find({ event: data.event }, (err, messages) => {
//       if (err) {
//         console.log(err);
//       } else {
//         messages.forEach((message) => {
//           const messageToSend = {
//             handle: message.handle,
//             message: message.message,
//             event: message.event,
//           };
//           socket.emit('chat', messageToSend);
//         });
//       }
//     });
//   });
//   socket.on('chat', (data) => {
//     Message.create({
//       handle: data.handle,
//       message: data.message,
//       event: data.event
//     }, (err, message) => {
//       if (err) {
//         console.log(err);
//       } else {
//         io.sockets.emit('chat', data);
//       }
//     });
//   });

//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', data);
//   });
// });

