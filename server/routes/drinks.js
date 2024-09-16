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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const apiResponse = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (apiResponse.data.drinks) {
      res.json(apiResponse.data.drinks[0]);
    } else {
      res.status(404).json({ error: 'Drink not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drink data' });
  }
});

module.exports = router;
