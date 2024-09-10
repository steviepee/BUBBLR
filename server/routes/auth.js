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
  console.log(profile)

  User.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      nameFirst: profile.name.givenName,
      nameLast: profile.name.familyName,
      email: profile.emails[0].value,
    },
  })
    .then(([user, created]) => {
      console.log('User found or created:', user);
      console.log('Was a new user created?', created);
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

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

module.exports = router;
