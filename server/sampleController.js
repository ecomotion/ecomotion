const db = require('./databaseModels.js');

const sampleController = {};

sampleController.Sample = (req, res, next) => {
  const querySelector = 'REPLACE WITH QUERY';
  const mealResults = db.query(querySelector)
    .then((results) => {
      console.log('sample');
    });
};


module.exports = sampleController;