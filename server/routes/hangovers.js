// don't forget to res.json instead of res.send info
const express = require('express');
const {
  Hangovers,
  Symptoms,
  PastDrinks,
  PastFoods,
  PastMixers,
} = require('../db/index');

const hangoverRouter = express.Router();
/**
 * In this file, 5 models converge to commit their info to various graphs.
 * this first get request should take the information from each of these
 * models and send them all to the client to sort
 */
hangoverRouter.get('/', (req, res) => {
  Promise.all([
    Hangovers.findAll(),
    Symptoms.findAll(),
    PastDrinks.findAll(),
    PastFoods.findAll(),
    PastMixers.findAll(),
  ]).then((results) => {
    console.log(results);
    res.status(200).json(results);
  }).catch((err) => {
    console.error('failed to retrieve', err);
    res.sendStatus(500);
  });
});

module.exports = hangoverRouter;
