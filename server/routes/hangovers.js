// don't forget to res.json instead of res.send info
const express = require('express');
const { Hangover, Symptom, PastDrink, PastFood } = require('../db/index');

const hangoverRouter = express.Router();
/**
 * In this file, 5 models converge to commit their info to various graphs.
 * this first get request should take the information from each of these
 * models and send them all to the client to sort
 */
hangoverRouter.get('/', (req, res) => {
  Promise.all([
    Hangover.findAll(),
    Symptom.findAll(),
    PastDrink.findAll(),
    PastFood.findAll(),
  ])
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error('failed to retrieve', err);
      res.sendStatus(500);
    });
});
// POST request should take all form info and separate it into linked tables
hangoverRouter.post('/', async (req, res) => {
  // Extract the individual elements from the request body object
  for (let i = 0; i < Object.keys(req.body).length; i += 1) {
    console.log('the government is keeping it away');
    console.log(Object.keys(req.body.info)[i]);
    // console.log(Object.values(req.body.info)[i]);
  }
  const {
    hangoverName,
    hangoverDate,
    addSub,
    hangoverNote,
    symptomName,
    symptomSeverity,
    symptomDuration,
    drink,
    shot,
    timespan,
    food,
  } = req.body.info;
  /**
   * This request will send information for many tables referencing only 1 hangover
   * The point here is that the hangover in question
   *  establishes its connection with the rest of them before heading to the database
   * -------------------------------------------------------------------------------
   * as far as using this with the arrays that come in (i.e. symptoms)
   * I could set a Promise all with a map of one of the symptom qualities and its index.
   * I'll have at every instance a Symptom being created with each of those values
   *  and the correct hangover id
   */

  // Create a Hangover instance from the hangover-specific elements of the form

  try {
    const firstSet = await Hangover.create({
      hangoverName,
      hangoverDate,
      addSub,
      hangoverNote,
    });
    // create a Symptom instance from the symptom-specific elements in the form,
    // using the new hangover ID from the created hangover instance
    const secondSet = await Symptom.create(
      {
        symptomName,
        symptomSeverity,
        symptomDuration,
        HangoverId: firstSet.id,
      },
      { include: ['hangover'] },
    );
    // While still holding on to that hangover id, create a pastDrink and PastFood instance
    // give them all that same hangover id
    const thirdSet = await PastDrink.create(
      {
        drink,
        shot,
        timespan,
        HangoverId: firstSet.id,
      },
      { include: ['hangover'] },
    );
    const lastSet = await PastFood.create(
      {
        food,
        HangoverId: firstSet.id,
      },
      { include: ['hangover'] },
    );
    res.sendStatus(201);
  } catch (err) {
    console.error('unable to create', err);
    res.sendStatus(500);
  }
});

// change hangover info
hangoverRouter.patch('/hangover/:id', async (req, res) => {
  const { hangInfo } = req.body;
  const { id } = req.params;
  console.log('hangover stuff', hangInfo, 'id:', id);
  const {
    hangoverName,
    hangoverDate,
    addSub,
    hangoverNote,
  } = req.body;
  try {
    const hangChange = await Hangover.update(
      // {
        // hangoverName,
        // hangoverDate,
        // addSub,
        // hangoverNote,
        hangInfo,
      // },
      { where: { id: +id }, returning: true },
    );
    // .then(
    // (ret) => {
    console.log('hangchange', hangChange);
    if (hangChange[0] !== 0) {
    res.sendStatus(200);
    } else {
    res.status(404).send('Unable to change hangover info');
    }
    // }
    // );
    // .catch((err) => {
  } catch (err) {
    console.error('could not complete request', err);
    res.sendStatus(500);
  }
  // });
});

// change symptom info
hangoverRouter.patch('/symptom/:id', async (req, res) => {
  const { symInfo } = req.body;
  console.log('symptom info', symInfo);
  const { id } = req.params;
  const { symptomName, symptomSeverity, symptomDuration } = req.body;
  try {
    const symChange = await Symptom.update(
      {
        symptomName,
        symptomSeverity,
        symptomDuration,
      },
      {
        returning: true,
        where: {
          id,
        },
      },
    );
    // .then((ret) => {
    if (symChange[0] !== 0) {
    res.sendStatus(200);
    } else {
    res.status(404).send('Unable to change symptom info');
    }
    // })
  } catch (err) {
    // .catch((err) => {
    console.error('could not complete request', err);
    res.sendStatus(500);
  }
  // });
});

// change drink info
hangoverRouter.patch('/drink/:id', async (req, res) => {
  const { drinkInfo } = req.body;
  console.log('drinkInfo', drinkInfo);
  const { id } = req.params;
  const {
    drink,
    shot,
    timespan,
  } = req.body;
  try {
    const drinkChange = await PastDrink.update(
      {
        drink,
        shot,
        timespan,
       },
      {
        returning: true,
        where: {
          hangoverId: id,
        },
      },
    );
    // .then((ret) => {
    if (drinkChange[0] !== 0) {
    res.sendStatus(200);
    } else {
    res.status(404).send('Unable to change drink info');
    }
    // })
  } catch (err) {
    // .catch((err) => {
    console.error('could not complete request', err);
    res.sendStatus(500);
  }
  // });
});

// change food info
hangoverRouter.patch('/food/:id', async (req, res) => {
  const { foodInfo } = req.body;
  console.log('foodz', foodInfo);
  const { id } = req.params;
  const { food } = req.body;
  try {
    const foodChange = await PastFood.update({ food }, {
      returning: true,
      where: {
        hangoverId: id,
      },
    });
    // .then((ret) => {
    if (foodChange[0] !== 0) {
    res.sendStatus(200);
    } else {
    res.status(404).send('Unable to change food');
    }
    // })
    // .catch((err) => {
  } catch (err) {
    console.error('could not complete request', err);
    res.sendStatus(500);
  }
  // });
});

// delete hangovers
hangoverRouter.delete('/:id', (req, res) => {
  // const { element } = req.body;
  // const { id } = req.params;
  Hangover.destroy({ where: { id: req.params.id } })
    .then((row) => {
      if (row !== 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send('could not delete hangover');
      }
    })
    .catch((err) => {
      console.error('Failed to delete hangover', err);
      res.sendStatus(500);
    });
});

// delete symptoms
hangoverRouter.delete('/symptom/:id', (req, res) => {
  // const { element } = req.body;
  const { id } = req.params;
  Symptom.destroy({ where: { id } })
    .then((row) => {
      if (row !== 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send('could not delete symptom');
      }
    })
    .catch((err) => {
      console.error('Failed to delete symptom info', err);
      res.sendStatus(500);
    });
});

// delete drinks
hangoverRouter.delete('/drink/:id', (req, res) => {
  // const { element } = req.body;
  const { id } = req.params;
  PastDrink.destroy({ where: { id } })
    .then((row) => {
      if (row !== 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send('could not delete drink');
      }
    })
    .catch((err) => {
      console.error('failed to delete drink info', err);
      res.sendStatus(500);
    });
});

// delete food
hangoverRouter.delete('/food/:id', (req, res) => {
  // const { element } = req.body;
  const { id } = req.params;
  PastFood.destroy({ where: { id } })
    .then((row) => {
      if (row !== 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send('could not delete food');
      }
    })
    .catch((err) => {
      console.error('Failed to delete food', err);
      res.sendStatus(500);
    });
});

module.exports = hangoverRouter;
