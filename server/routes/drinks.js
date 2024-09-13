const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const letter = req.query.letter || 'A';
  try {
      const apiResponse = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      res.json(apiResponse.data.drinks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch drinks data' });
    }
});

module.exports = router;
