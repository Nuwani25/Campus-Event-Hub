const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  studentEmail: String,
  eventId: String,
  registrationType: String
});

module.exports = mongoose.model('Registration', RegistrationSchema);
