/* eslint-disable no-console */
const express = require('express');

const events = express.Router();
const { Event, Bar } = require('../db/index');

// For getting user events
events.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const storedEvents = await Event.findAll({
      where: { userId },
      include: {
        model: Bar,
        through: { attributes: [] },
      },
    });
    console.log('Events found:', storedEvents);

    res.status(200).json(storedEvents);
  } catch (error) {
    console.error('Error fetching events', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// For saving user events
events.post('/', async (req, res) => {
  const { name, bars } = req.body;
  const userId = req.user.id;

  try {
    console.log('Request body:', req.body);
    const newEvent = await Event.create({ name, userId });
    const barPromises = bars.map(async (bar) => {
      let storedBar = await Bar.findOne({ where: { name: bar.name } });

      if (!storedBar) {
        storedBar = await Bar.create({
          name: bar.name,
          city: bar.city,
          state: bar.state,
          zipcode: bar.zipcode,
        });
      }
      await newEvent.addBar(storedBar);
    });

    await Promise.all(barPromises);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error saving event', error);
    res.status(500).json({ error: 'Failed to save event' });
  }
});

// For deleting user events
events.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404);
    }
    await event.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

module.exports = events;
