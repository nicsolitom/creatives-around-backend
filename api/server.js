require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const AuthService = require('./services/auth.service');
const UserService = require('./services/user.service');

const frontEndPath = '../../creatives-around-frontend/creatives-around-app/build';

const api = express();
// CONNECT TO DATABASE
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});
7;
// MIDDLEWARE TO ALLOW ONLY REGISTERED USERS
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  next('Not authorized');
};

api.use(cors());
api.use(morgan('dev'));
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static(frontEndPath));

const ApiServices = [new AuthService(api), new UserService(api, secured)];

// SET UP OTHER ROUTES
ApiServices.forEach((service) => {
  service.setupRouter();
});
// SERVE FRONTEND - NEED TO BE LAST
api.get('*', (req, res) => {
  res.sendFile(path.resolve(`${frontEndPath}/index.html`));
});
// HANDLE ERRORS
api.use((error, req, res, next) => {
  return res.send(error.message);
});

const port = process.env.PORT || 5000;
api.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.api = { api, secured };
