const { javascript } = require('webpack');
const db = require('./databaseModels.js');
//require in query
const { query } = require('./databaseModels.js');

const cookieParser = require('cookie-parser');

const sampleController = {};

//autocomplete data is grabbed from the airports table
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

//sending the flight input data into the flights table in the database
sampleController.sendFlightInfo = (req, res, next) => {
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
  //first checking to see if the google_id exists in the users table
  const googleId = [res.locals.id];
  const findQuery = 'SELECT * FROM users WHERE google_id=$1';
  db.query(findQuery, googleId)
    .then((res) => {
      //logic that shows the google_id doesn't exist based on the object
      if (res.rowCount === 0) {
        const querySelector =
          'INSERT INTO users (google_id, name, email, ssid) VALUES($1,$2,$3,$4)';
        db.query(querySelector, userInfo)
          .then(() => console.log('successfully queried in addProfile'))
          .catch((err) =>
            console.log('unable to complete query in addProfile', err)
          );
        //otherwise don't add user into users table
      } else console.log('user already exists');
    })
    .catch((err) => console.log('query error', err));
};

//querying users flight history for the profile container
sampleController.loadProfile = (req, res, next) => {
  const querySelector =
    //this is some weird syntax to get an array of json objects out of the query -- go amy!
    'SELECT array_to_json(array_agg(row_to_json (r))) FROM (SELECT depart, arrive, co2_impact, CAST(co2_impact as float)*0.04583 as tree_impact, CAST(co2_impact as float)*0.066545 as meat_impact, CAST(co2_impact as float)*30.26134 as bags_impact from flights left join users on CAST(flights.user_id as integer) = CAST(users._id as integer) where users.ssid=$1) r;';
  const userInfo = [req.cookies['session-name.sig']];

  db.query(querySelector, userInfo).then((result) => {
    console.log('query result', result.rows[0]);
    res.locals.profileData = result.rows[0];
    return next();
  });
};

module.exports = sampleController;
