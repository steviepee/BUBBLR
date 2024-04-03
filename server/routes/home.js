const express = require('express');

const router = express.Router();
const axios = require('axios');
const { estDrinks } = require('../db/index');

router.get('/api/estDrinks', (req, res) => {
  estDrinks
    .findAll()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/api/estDrinks', async (req, res) => {
  const data = req.body;
  const drinkId = data.drinkId;

  const exists = await estDrinks.findOne({ where: { drinkId } });
  if (exists) {
    res.sendStatus(200);
  } else {
    estDrinks
      .create(data)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }
});

module.exports = router;
