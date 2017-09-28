const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const eventSchema = mongoose.Schema({
  title: String,
  location: String,
  time: Date, 
  link: String,
  author: String,
  description: String,
  imgUrl: String,
});

eventSchema.plugin(findOrCreate);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
