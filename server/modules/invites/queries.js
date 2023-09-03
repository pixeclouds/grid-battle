const createInvite = 'INSERT INTO invites (id, player_id, gameroom) VALUES($1, $2, $3)'
const getInvites = 'SELECT p.username, i.player_id, i.gameroom FROM invites i LEFT JOIN players p on p.id = i.player_id WHERE NOT player_id = $1'
const getInvite = 'SELECT i.id, p.username, i.player_id, i.gameroom FROM invites i LEFT JOIN players p on p.id = i.player_id WHERE i.player_id = $1'
const deleteInvite = 'DELETE FROM invites WHERE gameroom = $1'

const createPrivateInvite = 'INSERT INTO private_invites (id, sender, receiver, gameroom) VALUES ($1, $2, $3, $4)'
const getPrivateInvite = 'SELECT * FROM private_invites WHERE sender = $1 AND receiver = $2'
const getSentPrivateInvite = 'SELECT p.username invited, i.id, i.gameroom FROM private_invites i LEFT JOIN players p on p.id = i.receiver WHERE i.sender = $1'
const getReceivedPrivateInvite = 'SELECT p.username invitee, i.id, i.gameroom FROM private_invites i LEFT JOIN players p on p.id = i.sender WHERE i.receiver = $1'


module.exports = {
    createInvite,
    createPrivateInvite,
    getInvites,
    getPrivateInvite,
    getInvite,
    deleteInvite,
    getReceivedPrivateInvite,
    getSentPrivateInvite,
}