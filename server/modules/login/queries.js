
const getPlayer = 'SELECT * FROM players WHERE username = $1;'
const createPlayer = 'INSERT INTO players (id, username, password) VALUES ($1, $2, $3);'

module.exports = {
    getPlayer,
    createPlayer,
}