/* eslint-disable camelcase */
/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db/index');
require('dotenv').config();

const router = express.Router();

const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, npm_lifecycle_event } = process.env;

const devOrProd = () => {
  // eslint-disable-next-line camelcase
  if (npm_lifecycle_event === 'start') {
    return 'localhost';
  }
  return '13.52.61.243';
};

passport.use(new GoogleStrategy({
  clientID: `${GOOGLE_CLIENT_ID}`,
  clientSecret: `${GOOGLE_CLIENT_SECRET}`,
  callbackURL: `http://${devOrProd()}:8080/auth/google/callback`,
}, (accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      nameFirst: profile.name.givenName,
      nameLast: profile.name.familyName,
      email: profile.emails[0].value,
    },
  })
    .then(([user, created]) => {
      cb(null, user);
    })
    .catch((err) => {
      console.error('Error during user findOrCreate:', err);
      cb(err, null);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findAll({ where: { googleId: req.user.googleId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/',
}));

router.get('/check-auth', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

module.exports = router;
