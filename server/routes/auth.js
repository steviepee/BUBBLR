const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
const { User } = require('../db/index');
require('dotenv').config();

const router = express.Router();
// const app = express();

const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, npm_lifecycle_event } = process.env;


const devOrProd = () => {
  if(npm_lifecycle_event === 'start'){
    return 'localhost';
  } else {
    return '13.52.61.243';
  }
}

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://${devOrProd()}:8080/auth/google/callback`
  },
  ((accessToken, refreshToken, profile, cb) => {
    // console.log(profile);
    // console.log('access token: ', accessToken);
    // console.log('refresh token: ', refreshToken); // undefined
    const { id, displayName } = profile;
    User.findOrCreate({ where: { googleId: profile.id, displayName } })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => cb(err, null));
  }),

));

passport.serializeUser((user, done) => {
  // console.log(`--------> Serialize User`);
  // console.log(user);
  // console.log(Object.getOwnPropertyNames(user[0]));
  // even though dataValues is in the above log, the below log shows undefined
  // console.log(user[0].dataVaules);

  done(null, user);
  // done(null, user[0].dataVaules.googleId);
});

passport.deserializeUser((user, done) => {
// passport.deserializeUser((id, done) => {
  // console.log("---------> Deserialize User")
  // console.log(user);
  // console.log(id);
  // const user = User.find((u) => u.googleId === id);
  done(null, user);
});

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}, (req) => {
  // console.log(req, 'hiiii');
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
