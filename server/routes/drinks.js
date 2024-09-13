const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const apiResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      res.json(apiResponse.data.drinks); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch drinks data' });
    }
});

module.exports = router;
