const path = require('path');
const express = require('express');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const { User } = require('./db');
require('dotenv').config();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
// console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
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
    console.log(accessToken, refreshToken, profile.id, cb);
    User.findOrCreate({ where: { googleId: profile.id } })
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log('Error creating a User: ', err));
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
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

// app.post('/logout', (req, res) => {
//   req.logOut((err) => {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
//   res.redirect('/login');
//   console.log('-------> User Logged out');
// });

const PORT = 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on localhost:${PORT}`);
});
