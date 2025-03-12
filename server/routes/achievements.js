/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const { Achievements } = require('../db/index');

router.get('/', async (req, res) => {
  try {
    const achievements = await Achievements.findAll();
    res.json(achievements);
  } catch (err) {
    console.error('err fetching achievements', err);
    res.status(500);
  }
});

module.exports = router;
