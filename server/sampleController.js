const { javascript } = require('webpack');
const db = require('./databaseModels.js');
//require in query
const { query } = require('./databaseModels.js');

const cookieParser = require('cookie-parser');

const sampleController = {};

sampleController.getAirport = (req, res, next) => {
  console.log('inside the getAirport controller');
  const allAirports = 'SELECT code, name, countryname from airports';

  const airports = [];

  db.query(allAirports).then((results) => {
    results.rows.forEach((row) => {
      return airports.push(row.code + ', ' + row.name + ', ' + row.countryname);
    });
    res.locals.airports = airports;
    next();
  });
};

sampleController.sendFlightInfo = (req, res, next) => {
  console.log('getting cookies', req.cookies['session-name.sig']);
  console.log('getting info from body for flight', req.body);
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
    console.log('checking carbon data to write to db', req.body.carbon);
    console.log(
      'checking type of carbon data to write to db',
      typeof req.body.carbon
    );
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

sampleController.loadProfile = (req, res, next) => {
  const querySelector =
    'SELECT array_to_json(array_agg(row_to_json (r))) FROM (SELECT depart, arrive, co2_impact, CAST(co2_impact as float)*0.04583 as tree_impact, CAST(co2_impact as float)*0.066545 as meat_impact, CAST(co2_impact as float)*30.26134 as bags_impact from flights left join users on CAST(flights.user_id as integer) = CAST(users._id as integer) where users.ssid=$1) r;';
  const userInfo = [req.cookies['session-name.sig']];
  console.log('checking userInfo in load profile', userInfo);

  db.query(querySelector, userInfo).then((result) => {
    console.log('query result', result.rows[0]);
    res.locals.profileData = result.rows[0];
    return next();
  });
};

module.exports = sampleController;
