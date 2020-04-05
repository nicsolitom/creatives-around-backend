const express = require('express');
const passport = require('passport');
const session = require('express-session');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const { Strategy: LocalStrategy } = require('passport-local');
class AuthService {
  constructor(app) {
    this.router = express.Router();
    this.app = app;
    const sessionOptions = {
      secret: process.env.SESSION_SECRET,
      cookie: {},
      resave: false,
      saveUninitialized: true,
    };
    this.app.use(session(sessionOptions));
    this.setupStrategies();
  }
  setupRouter() {
    this.router.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });
    this.router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
      res.redirect('/users');
    });
    this.app.use('/api/auth', this.router);
  }
  // PASSPORT STRATEGIES
  setupStrategies() {
    const strategy = new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (username, password, done) => {
        const user = await User.findOne({ email: username }).lean();
        if (!user) {
          return done(null, null);
        }
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
          return done(null, null);
        }
        done(null, user);
      }
    );
    passport.use(strategy);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.serializeUser((id, done) => {
      done(null, id);
    });

    passport.deserializeUser((id, done) => {
      // FIND USER BY ID
      User.findById(id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, null);
        }
        return done(null, user);
      });
    });
  }
}

module.exports = AuthService;
