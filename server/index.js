const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const { User } = require('./db/index');

// const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
require('dotenv').config();

// MIDDLEWARES
const app = express();
app.set('view engine', 'ejs');
// app.set('view engine', 'jsx');
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'bubblr',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.use(passport.initialize());
app.use(passport.session());

// SERVING REACT STATIC PAGES
const CLIENT_PATH = path.resolve(__dirname, '../dist');
app.use(express.static(CLIENT_PATH));

// ROUTER SENDING TO WHEREVER
app.use('/auth', authRouter);

// ROUTES FOR THIS FILE
app.get('/dashboard', (req, res) => {
  // res.cookies()
  res.render(path.join(__dirname, '../client/views/dashboard.ejs'), { url: '/dashboard' });
});
app.post('/logout', (req, res, next) => {
  req.logOut(
    (err) => {
      if (err) { return next(err); }
      res.redirect('/login');
    },
  );
  // res.redirect('/login');
  // console.log('-------> User Logged out');
});

// for getting user info from db
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((userObj) => {
      // console.log('find by pk result', userObj);
      res.send(userObj);
    })
    .catch((err) => {
      console.error('failed finding user by pk: ', err);
      res.send(500);
    });
});

app.get('*', (req, res) => {
  // console.log('trying to find full url', req.hostname);
  res.sendFile(path.join(CLIENT_PATH, 'index.html'));
});

// app.post('/logout', (req, res) => {
//   req.logOut((err) => {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
//   res.redirect('/login');
//   console.log('-------> User Logged out');
// });

const PORT = 8080;

const devOrProd = () => {
  if (process.env.npm_lifecycle_event === 'start') {
    return 'localhost';
  }
  return '13.52.61.243';
};

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server listening on http://${devOrProd()}:${PORT}`);
});
