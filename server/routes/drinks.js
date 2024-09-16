const express = require('express');
const axios = require('axios');
const router = express.Router();
const { estDrinks, Comment, Rating } = require('../db/index');

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
    if (!apiResponse.data.drinks) {
      return res.status(404).json({ error: 'Drink not found' });
    }
    const drinkDetails = apiResponse.data.drinks[0];
    const comments = await Comment.findAll({ where: { drinkId: id } });
    const ratings = await Rating.findAll({ where: { drinkId: id } });
    const averageRating = ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      : 0;

    res.json({
      drink: drinkDetails,
      comments,
      averageRating
    });
  } catch (error) {
    console.error('Failed to fetch drink data', error);
    res.status(500).json({ error: 'Failed to fetch drink data' });
  }
});

// Add a comment for a specific drink
router.post('/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const newComment = await Comment.create({ drinkId: id, comment });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Failed to add comment', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Add a rating for a specific drink
router.post('/:id/rating', async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const newRating = await Rating.create({ drinkId: id, rating });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add rating' });
  }
});

module.exports = router;
