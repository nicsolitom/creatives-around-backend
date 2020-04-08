//! NOT YET TESTED IF IT WORKS WELL WITH THE usersRegModel.js

const mongoose = require('mongoose');
mongoose.pluralize(null);

//! birthday needs to be configured to Date
//! + location with longitude + latitude
//! + artForms & lookingForArtForms with several tags
//! + gallery with URL's
//! + events (Date instead of Number)

const usersProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersRegList',
    required: true
  },
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
        type: [String],
        required: true
    },
    gallery: {
        type: [String]
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
        type: [String]
    },
    linkDescription: {
        type: String
    },
    linkURL: {
        type: [String]
    },
    events: {
        name: String,
        date: Number
    }
});

const UsersProfileInfos = mongoose.model('UsersProfileInfos', usersProfileSchema);
module.exports = usersProfileSchema;

// date: {
//   type: Date,
//   default: Date.now
// }