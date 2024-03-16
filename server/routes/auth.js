const express = require('express');

const router = express.Router();

router.get('/google', (req, res, next) => {
  res.send('Hiya');
});

module.exports = router;
