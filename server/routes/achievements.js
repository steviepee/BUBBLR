/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const { Achievements } = require('../db/index');

// get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievements.findAll();
    // console.log(achievements);
    res.json(achievements);
  } catch (err) {
    console.error('err fetching achievements', err);
    res.status(500);
  }
});

// get achievement by id
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievements.findByPk(req.params.id);
    res.json(achievement);
  } catch (err) {
    console.error('err fetching achievement', err);
    res.status(500);
  }
});

module.exports = router;
