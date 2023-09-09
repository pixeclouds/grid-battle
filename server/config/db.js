const Pool = require('pg').Pool


// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// })

const pool = new Pool ({ connectionString: process.env.DB_CONNECTION_STRING})

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