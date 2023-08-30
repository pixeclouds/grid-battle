const createInvite = 'INSERT INTO invites (id, player_id, gameroom) VALUES($1, $2, $3)'
const getInvites = 'SELECT p.username, i.player_id, i.gameroom FROM invites i LEFT JOIN players p on p.id = i.player_id'
const getInvite = 'SELECT p.username, i.player_id, i.gameroom FROM invites i LEFT JOIN players p on p.id = i.player_id WHERE i.player_id = $1'
const deleteInvite = 'DELETE FROM invites WHERE id = $1'

const createPrivateInvite = 'INSERT INTO private_invites (id, sender, receiver, gameroom) VALUES ($1, $2, $3, $4)'

const getPrivateInvite = 'SELECT * FROM private_invites WHERE sender = $1 AND receiver = $2'

module.exports = {
    createInvite,
    createPrivateInvite,
    getInvites,
    getPrivateInvite,
    getInvite,
    deleteInvite,
}