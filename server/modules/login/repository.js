const {pool} = require('../../config/db')
const queries = require('./queries')

const getPlayer = async (username) => {
    try {
        let user = await pool.query(queries.getPlayer, [username])
        return user.rows
    } catch (err) {
        throw err
    }
}

const createPlayer = async (id, username, password) => {
    try {
        await pool.query(queries.createPlayer, [id, username, password])
        return 
    } catch (err) {
        throw err
    }
}

module.exports = {
    getPlayer,
    createPlayer
}