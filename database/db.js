const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '/Users/dianarestrepo/Desktop/birder/Birder/.env')
});


const {Pool, Client} = require('pg');

const config = {
  host: 'localhost',
  user:'dianarestrepo',
  database: 'blue_ocean',
  port: 5432,
  password: "",
};



// console.log(process.env.PGHOST)
// console.log(process.env.PGPASSWORD)
const pool = new Pool(config);
console.log('CONNECTED TO POSTGRES');

module.exports = {
  pool
}
