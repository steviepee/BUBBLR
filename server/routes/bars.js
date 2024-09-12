const express = require('express');
const axios = require('axios');

const bars = express.Router();
require('dotenv').config();

bars.get('/', async (req, res) => {
  const { query } = req.query;
  const options = {
    method: 'GET',
    url: 'https://local-business-data.p.rapidapi.com/search',
    params: {
      query,
      limit: 1,
      subtypes: 'bar',
    },
    headers: {
      'X-RapidAPI-Key': `${process.env.LBD_API_KEY}`,
      'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching bar data:', error);
    res.status(500).json({ error: 'Failed to fetch bar data' });
  }
});

module.exports = bars;
