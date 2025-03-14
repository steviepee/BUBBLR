// don't forget to res.json instead of res.send info
const express = require('express');
const {
  Hangover,
  Symptom,
  PastDrink,
  PastFood,
  PastMixer,
} = require('../db/index');

const hangoverRouter = express.Router();
/**
 * In this file, 5 models converge to commit their info to various graphs.
 * this first get request should take the information from each of these
 * models and send them all to the client to sort
 */
hangoverRouter.get('/', (req, res) => {
  Promise.all([
    Hangover.findAll(),
    Symptom.findAll(),
    PastDrink.findAll(),
    PastFood.findAll(),
    PastMixer.findAll(),
  ]).then((results) => {
    console.log(results);
    res.status(200).json(results);
  }).catch((err) => {
    console.error('failed to retrieve', err);
    res.sendStatus(500);
  });
});

hangoverRouter.post('/', async (req, res) => {
  try {
    const newHang = await Hangover.create();
  } catch (error) {
    console.error(error);
  }
});

hangoverRouter.patch('/:id', (req, res) => {});

hangoverRouter.delete('/:id', (req, res) => {});

module.exports = hangoverRouter;
