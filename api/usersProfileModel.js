const mongoose = require('mongoose');
mongoose.pluralize(null);

//! birthday needs to be configured to Date
//! + location with longitude + latitude
//! + artForms & lookingForArtForms with several tags
//! + gallery with URL's
//! + events (Date instead of Number)

const usersProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  birthday: { 
      type: Number,
      required: true
    },
    location: {
        type: String,
        required: true
    },
    artForms: {
        type: String,
        required: true
    },
    gallery: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    lookingFor: {
        type: String,
        required: false
    },
    lookingForArtForms: {
        type: String,
        required: false
    },
    linkDescription: {
        type: String,
        required: true
    },
    linkURL: {
        type: String,
        required: true
    },
    events: {
        name: String,
        date: Number,
        required: false
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersRegList',
    required: true
  }
});

const UsersProfileInfos = mongoose.model('UsersProfileInfos', usersProfileSchema);
module.exports = usersProfileSchema;
