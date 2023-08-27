const createInvite = 'INSERT INTO invites (id, player_id, gameroom) VALUES($1, $2, $3)'
const getInvites = 'SELECT p.username, i.player_id, i.gameroom FROM invites i LEFT JOIN players p on p.id = i.player_id'
const getInvite = 'SELECT p.username, i.player_id, i.gameroom FROM invites i LEFT JOIN players p on p.id = i.player_id WHERE i.player_id = $1'
const deleteInvite = 'DELETE FROM invites WHERE id = $1'

module.exports = {
    createInvite,
    getInvites,
    getInvite,
    deleteInvite,
}