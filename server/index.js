const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { User, customDrinks, estDrinks } = require('../server/db/index');
const axios = require('axios');

// const { customDrinks } = require('./db/index');

// const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
// const apiRouter = require('./routes/api');
require('dotenv').config();

// MIDDLEWARES
const app = express();
app.set('view engine', 'ejs');
// app.set('view engine', 'jsx');
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'bubblr',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// SERVING REACT STATIC PAGES
const CLIENT_PATH = path.resolve(__dirname, '../dist');
app.use(express.static(CLIENT_PATH));

// ROUTER SENDING TO WHEREVER
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

// ROUTER SENDING TO WHEREVER
// app.use('/api', apiRouter);

// ROUTES FOR THIS FILE
app.get('/dashboard', (req, res) => {
  // res.cookies()
  res.render(path.join(__dirname, '../client/views/dashboard.ejs'), {
    url: '/dashboard',
  });
});
app.post('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
  // res.redirect('/login');
  // console.log('-------> User Logged out');
});

app.get('/api/customDrinks', (req, res) => {
  // console.log(req.body)
  customDrinks
    .findAll()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  // res.status(200).send('hello post request')
});

app.get('/api/getIngredients', (req, res) => {
  axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((results) => {
      console.log(results.data.drinks);
      // let storage = []
      // results.data.drinks.forEach((drink) => {
      //     storage.push(drink['strIngredient1'])
      res.status(200).send(results.data.drinks);
    })
    .catch((err) => {
      // console.log(storage)
      // updateIngredients(newIngredients => [...newIngredients, storage])
      // updateIngredients(storage)
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/api/customDrinks', (req, res) => {
  console.log(req.body);
  data = req.body;
  customDrinks
    .create(data)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// add to db only when drink info is 'got'
app.post('/api/estDrinks', async (req, res) => {
  console.log(req.body);
  let data = req.body;

  estDrinks
    .findOne({ where: { drinkId: data.drinkId } })
    .then((exists) => {
      if (exists) {
        res.sendStatus(200);
      } else {
        estDrinks
          .create(data)
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
