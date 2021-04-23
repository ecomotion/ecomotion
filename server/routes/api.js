const express = require('express');
const sampleController = require('../sampleController.js');
const router = express.Router();

//sample route
router.get('/', (req, res) => {
  return res.status(200).send('sample');
});


module.exports = router;