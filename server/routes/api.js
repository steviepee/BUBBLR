const express = require('express');
const router = express.Router();

const customDrinks = require('../db/index')


router.get('/api/customDrinks', (req, res) => {
    customDrinks.findAll()
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((err) => {
        console.error(err)
        res.sendStatus(500)
    })
}) 


router.post('/api/customDrinks', (req, res) => {
    console.log(req.body)
    data = req.body
    customDrinks.create(data)
    .then(() => {
        res.sendStatus(200)
    })
    .catch((err) => {
        console.error(err)
        res.sendStatus(500)
    })
    
})


module.exports = router;
