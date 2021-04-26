const express = require('express');
const sampleController = require('../sampleController.js');
const router = express.Router();

//getAirport route
router.get('/', sampleController.getAirport, (req, res) => {
  return res.status(200).json(res.locals.codes);
});


module.exports = router;