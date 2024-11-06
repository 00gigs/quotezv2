

const Pool = require('pg').Pool
require('dotenv').config()


const pool = new Pool({
    user:'jamesharrington',
    password:'password',
    host:'localhost',
    port:5430,
    database:'quoteapp'
})

module.exports = pool;