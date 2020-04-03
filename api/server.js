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

//? Allow cross origin access from frontend:
api.use((req, res, next) => {
    res.set('ACCESS-CONTROL-ALLOW-ORIGIN', 'http://localhost:5000');
    res.set('ACCESS-CONTROL-ALLOW-CREDENTIALS', 'true');
    res.set(
      'ACCESS-CONTROL-ALLOW-HEADERS',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.set(
      'ACCESS-CONTROL-ALLOW-METHODS',
      'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
    );
    next();
  });
  

//? Routes:
api.get('/', (req, res, next) => {
    console.log(`Home route called`);
    res.send(`Home route`)
});

const port = 3000;
api.listen(port, () => console.log(`Listening on port ${port}`));