const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  nickname: {
    type: String,
    required: true,
    minlength: 5,
  },
  location: {
    type: {
      lat: String,
      lon: String,
      country: String,
      city: String,
      street: String,
      code: String,
      district: String,
      house: String,
    },
  },
});
module.exports = mongoose.model('User', UserSchema);
