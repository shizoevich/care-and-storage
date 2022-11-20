const Pool = require('pg').Pool
const poll = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: "care_and_storage"
})

module.exports = poll