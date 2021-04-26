const { javascript } = require('webpack');
const db = require('./databaseModels.js');
//require in query
const { query } = require('./databaseModels.js');

const cookieParser = require('cookie-parser');

const sampleController = {};

sampleController.getAirport = (req, res, next) => {
  console.log('inside the getAirport controller')
  const allAirports = 'SELECT code, name, countryname from airports';

  const airports = [];

  db.query(allAirports)
    .then((results) => {
      results.rows.forEach((row) => {
        return airports.push(row.code + ', ' + row.name + ', ' + row.countryname)
      });
      res.locals.airports = airports;
      next();
    });
};

sampleController.sendFlightInfo = (req, res, next) => {
  console.log('getting cookies', req.cookies['session-name.sig']);
  console.log('gettin info from body for flight', req.body);
  const ssid = [req.cookies['session-name.sig']];
  const queryUserId = 'SELECT _id FROM users WHERE ssid=$1';
  db.query(queryUserId, ssid).then((res) => {
    const queryInsertFlight =
      'INSERT INTO flights (depart, arrive, user_id, co2_impact) VALUES ($1, $2, $3, $4)';
    const flightInsert = [
      req.body.dep,
      req.body.arr,
      res.rows[0]['_id'],
      req.body.carbon,
    ];
    db.query(queryInsertFlight, flightInsert)
      .then((res) => console.log('successfully queried in sendFlightInfo'))
      .then(() => next())
      .catch((err) =>
        console.log('unable to complete query in sendFlightInfo', err)
      );
  });
};

sampleController.addProfile = (req, res, next) => {
  //if user exists
  const userInfo = [
    res.locals.id,
    res.locals.name,
    res.locals.email,
    res.locals.ssid,
  ];

  console.log('this should be my googleId', res.locals.id);
  const googleId = [res.locals.id];
  const findQuery = 'SELECT * FROM users WHERE google_id=$1';
  db.query(findQuery, googleId)
    .then((res) => {
      if (res.rowCount === 0) {
        const querySelector =
          'INSERT INTO users (google_id, name, email, ssid) VALUES($1,$2,$3,$4)';
        db.query(querySelector, userInfo)
          .then(() => console.log('successfully queried in addProfile'))
          .catch((err) =>
            console.log('unable to complete query in addProfile', err)
          );
      } else console.log('user already exists');
    })
    .catch((err) => console.log('query error', err));
};
module.exports = sampleController;
