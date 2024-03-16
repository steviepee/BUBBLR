const path = require('path');
const express = require('express');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const passport = require('passport')
const session = require('express-session')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const app = express();

app.use(express.json());
app.use (passport.initialize())
app.use (passport.session())

const CLIENT_PATH = path.resolve(__dirname, '../dist');

app.use(express.static(CLIENT_PATH));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

passport.serializeUser( (user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done (null, user)
})

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
