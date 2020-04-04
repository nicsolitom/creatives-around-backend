const express = require('express');
const api = express();
const mongoose = require('mongoose');

const UsersRegList = require('./usersRegModel');
const UsersProfileInfos = require('./usersProfileModel');

//? Connecting with MongoDB Atlas:
const caUsers =
'mongodb+srv://caUser:creativesaroundnicmor@userscreativesaround-dldct.mongodb.net/test?retryWrites=true&w=majority';

mongoose
    .connect(caUsers, {
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
    
    //? Seed route to create 4 test users in MongoDB Atlas:
    api.get('/seed', async (req, res, next) => {
    let userId = '';
    const seedingUsers = [
        {
            email: 'first_user@test.me',
            password: 'first_user123'
        },
        {
            email: 'second_user@test.me',
            password: 'second_user123'
        },
        {
            email: 'third_user@test.me',
            password: 'third_user123'
        },
        {
            email: 'fourth_user@test.me',
            password: 'fourth_user123'
        }
    ];
    
    seedingUsers.map(user => {
        new UsersRegList({
            email: user.email,
            password: user.password
        }).save((err, data) => {
            if (err) {
                return console.log('Something went wrong!', err);
            }
            console.log(`Data: ${data._id}`);
            userId = data._id;
      });
    });
  
    console.log(`Seed route called`);
    res.send(`Seed route`);
  });

const port = 3000;
api.listen(port, () => console.log(`Listening on port ${port}`));