const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { User } = require('../db/index');
require('dotenv').config();

const router = express.Router();
const app = express();

const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = process.env;

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
  ((accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate({ where: { googleId: profile.id } })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => cb(err, null));
  }),

));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile', 'birthday'],
}, (req) => {
  console.log(req, 'hiiii');
  req.login((err) => {
    if (err) {
      console.error(err);
    }
  });
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

module.exports = router;
