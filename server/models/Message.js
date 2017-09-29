const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// could have other auth types later, e.g. Gmail, Twitter
const messageSchema = new Schema({
  handle: String,
  message: String,
  event: String,
});

const Message = mongoose.model('Message', messageSchema);
// TEST MESSAGE CREATION AND SAVE
// const testMessage = new Message({
//   handle: 'Jake',
//   message: 'I am a test',
//   event: 'coding frenzy',
// });

// testMessage.save((err) => {
//   if (err) {
//     console.log(err);
//   }
// });

module.exports = Message;