const { Pool } = require('pg');

// url from ElephantSQL
const PG_URI = process.env.postgresURI;

// create a new pool using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
