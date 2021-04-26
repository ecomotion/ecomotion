const db = require('./databaseModels.js');
//require in query
const { query } = require('./databaseModels.js');

const sampleController = {};

sampleController.Sample = (req, res, next) => {
  const querySelector = 'REPLACE WITH QUERY';
  const mealResults = db.query(querySelector).then((results) => {
    console.log('sample');
  });
};
sampleController.sendFlightInfo = (req, res, next) => {
  // const flightInsert = [req.body.dep, req.body.arr, info for user_id, info for created_at, req.body.carbon]
  // const addFlightQuery = 'INSERT INTO flights (depart, arrive, user_id, created_at, co2_impact) VALUES ($1, $2, $3, $4, $5)'
};

module.exports = sampleController;
