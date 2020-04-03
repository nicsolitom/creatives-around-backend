const express = require('express');
const api = express();
const mongoose = require('mongoose');

const UsersRegList = require('./usersRegModel');

//? Connecting with MongoDB Atlas:
const caUser =
'mongodb+srv://caUser:creativesaroundnicmor@userscreativesaround-dldct.mongodb.net/test?retryWrites=true&w=majority';

mongoose
    .connect(caUser, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`MongoDB Atlas connected`));

//? Routes:
api.get('/', (req, res, next) => {
    console.log(`Home route called`);
    res.send(`Home route`)
});

const port = 3000;
api.listen(port, () => console.log(`Listening on port ${port}`));