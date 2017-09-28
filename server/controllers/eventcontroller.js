var Event = require('../models/Event.js');

const getImgUrl = str => {
  let results = /<img\s*src\s*=\s*(")(\S+)\1/.exec(str);
  return results ? results[2] : '../styles/placeholder.png';
};

const setNotification = (event) => {
  // const testDate = new Date(2017, 8, 29);
  // const testEventTimeMs = testDate.valueOf();
  if (!event.eventDate) {
    return;
  }
  const timeArray = event.eventDate.split('-');
  const year = parseInt(timeArray[0]);
  const month = parseInt(timeArray[1]);
  const day = parseInt(timeArray[2]);
  const eventDate = new Date(year, month - 1, day);
  console.log(eventDate);
  const eventTimeMs = eventDate.valueOf();
  const currentTimeMs = Date.now();
  console.log(currentTimeMs / 60000, eventTimeMs / 60000);
  const timeUntilEvent = eventTimeMs - currentTimeMs;
  // const msToHours = milliseconds => ((milliseconds / ());
  console.log(timeUntilEvent, timeUntilEvent / 3600000);
  // 1 hour in ms is 3600000
  setTimeout(sendNotification, 10000, event);
  console.log(`notification set for: ${timeUntilEvent / 3600000} hours from now`);
};
const sendNotification = (event) => {
    console.log('notification sent:', event);
    // twilio request to event.attendees;
};

const saveEvent = event => {
  Event.findOrCreate({
    title: event.title || '',
    location: event.location || '',
    author: event.author || '',
    link: event.link || '',
    eventDate: event.eventDate || '',
    description: event.description || '',
    imgUrl: event.imgUrl || getImgUrl(event.description),
<<<<<<< HEAD
    attending: event.attending || []
=======
    eventDate: event.eventDate,
>>>>>>> [Create] setNotification function, in progress
  }, (err, entry, created) => {
    if (err) {
      console.error('error saving event', err);
    } else {
      if (created) {
        console.log('event successfully created', entry.title, entry.eventDate
        setNotification(entry);
      } else {
        setNotification(entry);
        console.log('event already exists', entry.title);
      }
    }
  });
  // var newEvent = new Event({
  //   title: event.title,
  //   link: event.link,
  //   description: event.description,
  //   imgUrl: event.imgUrl || getImgUrl(event.description),
  //   // extras
  //   // time: event.eventData,
  //   // postedBy: event.userID,
  // });
  // newEvent.save(err => {
  //   if (err) return console.error('err');
  // });
};

module.exports = saveEvent;
