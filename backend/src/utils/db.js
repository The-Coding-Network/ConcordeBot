const mysql = require('mysql')
const config = require('../../../configs/private.json')
const maps = require('../utils/maps')

module.exports = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
});