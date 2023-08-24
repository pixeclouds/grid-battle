
const getPlayer = 'SELECT username, password FROM users WHERE username = $1;'
const createPlayer = 'INSERT INTO users (username, password) VALUES ($1, $2);'

module.exports = {
    getPlayer,
    createPlayer
}