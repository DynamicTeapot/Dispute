require('../secrets/env');
// const data = require('./data.json');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '', // replace host if remote
    user: process.env.DB_USER || '', // enter DB user/role
    password: process.env.DB_PASS || '', // enter password
    database: 'postgres' // default DB is postgres
  },
  pool: {
    min: 1,
    max: 500
  }
});

module.exports = knex;