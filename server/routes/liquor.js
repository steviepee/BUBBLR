const express = require('express');
const liquor = express.Router();
const { LiquorCabinet } = require('../db/index')

liquor.get('/', (req, res) => {
  LiquorCabinet.findAll()
    .then((cabinetArray) => {
      res.status(200).send(cabinetArray)
    })
})

liquor.patch('/:id', async (req, res) => {

  LiquorCabinet.update(req.body, { where: req.params })

    .then((updatedLiquor) => {
      if (updatedLiquor[0]) {
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })

    .catch((error) => {
      console.error('Could not update liquor fill', error);
      res.sendStatus(500)
    });

})







module.exports = liquor