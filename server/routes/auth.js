const express = require('express');

const router = express.Router();

router.get('/auth/google', (req, res, next) => {
  res.render('login');
});

module.exports = router;
