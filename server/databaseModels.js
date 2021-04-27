const { Pool } = require('pg');
require('dotenv').config();

//slack allan if you need the url for the pg host to access the database in your terminal

//standard boilerplate
// create a new pool using the connection string above
const pool = new Pool({
  connectionString: process.env.PGHOST,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
