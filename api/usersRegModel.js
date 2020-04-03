const mongoose = require('mongoose');
mongoose.pluralize(null);

const usersRegSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UsersRegList = mongoose.model('UsersRegList', usersRegSchema);
module.exports = UsersRegList;