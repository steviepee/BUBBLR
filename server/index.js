const path = require('path');
const express = require('express');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
require('dotenv').config();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(session({
  secret: 'bubblr',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(passport.session());


const CLIENT_PATH = path.resolve(__dirname, '../dist');

app.use(express.static(CLIENT_PATH));

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
  ((accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
  }),
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: console.log('wow'),// tentative to changes
  // failureRedirect: '/login',
}));

const PORT = 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on localhost:${PORT}`);
});
