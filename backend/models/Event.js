const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  organizer: String,
  location: String,
  capacity: String,

  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true
  }

});

module.exports = mongoose.model('Event', EventSchema);
