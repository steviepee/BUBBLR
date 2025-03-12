const express = require('express');
const liquor = express.Router();
const { LiquorCabinet } = require('../db/index')

liquor.get('/', (req, res) => {
  LiquorCabinet.findAll()
    .then((cabinetArray) => {
      res.status(200).send(cabinetArray)
    })
})









module.exports = liquor