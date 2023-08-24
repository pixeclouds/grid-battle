const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'demo',
    password: 'postgres',
    port: 5432,
})

pool.connect((err, client, release) => {
    if (err) {
        return console.error(" Error acquiring client", err.stack)
    }
    client.query("SELECT NOW()", (err, result) => {
        release()
        console.log("connected to db")
    })
})

module.exports = { pool }