const createInvite = 'INSERT INTO invites (player, gameroom) VALUES($1, $2)'
const getInvites = 'SELECT * FROM invites'

module.exports = {
    createInvite,
    getInvites
}