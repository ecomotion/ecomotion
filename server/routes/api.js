const express = require('express');
const sampleController = require('../sampleController.js');
const router = express.Router();

//getAirport route
router.get('/', sampleController.getAirport, (req, res) => {
  return res.status(200).json(res.locals.airports);
});

//receive a post request to /api/newflight and send them to sendflightinfo functionality in samplecontroller
router.post('/newflight', sampleController.sendFlightInfo, (req, res) => {
  return res.status(200).send('input flight info into database');
});

module.exports = router;
