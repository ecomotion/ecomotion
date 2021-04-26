const db = require('./databaseModels.js');

const sampleController = {};

sampleController.getAirport = (req, res, next) => {
  console.log('inside the getAirport controller')
  const allCodes = 'SELECT code from airports';
  const codes = [];
  db.query(allCodes)
    .then((results) => {
      results.rows.forEach((row) => {
        codes.push(row.code)
      })
      // console.log(codes);
      res.locals.codes = codes;
      next();
    });
};


module.exports = sampleController;