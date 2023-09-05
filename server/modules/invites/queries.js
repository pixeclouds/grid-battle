const createInvite = 'INSERT INTO public_invites (id, player_id, gameroom, joined) VALUES($1, $2, $3, $4)'
const getInvites = 'SELECT p.username, i.player_id, i.gameroom, i.joined FROM public_invites i LEFT JOIN players p on p.id = i.player_id WHERE  player_id <> $1 AND joined = $2 '
const getInvite = 'SELECT i.id, p.username, i.player_id, i.gameroom, i.joined FROM public_invites i LEFT JOIN players p on p.id = i.player_id WHERE i.player_id = $1'
const deleteInvite = 'DELETE FROM public_invites WHERE gameroom = $1'
const updateInvite = 'UPDATE public_invites SET joined = $1 WHERE gameroom = $2'

const createPrivateInvite = 'INSERT INTO private_invites (id, sender, receiver, gameroom, joined) VALUES ($1, $2, $3, $4, $5)'
const getPrivateInvite = 'SELECT * FROM private_invites WHERE sender = $1 AND receiver = $2'
const getSentPrivateInvite = 'SELECT p.username receiver, i.id, i.gameroom, joined FROM private_invites i LEFT JOIN players p on p.id = i.receiver WHERE i.sender = $1'
const getReceivedPrivateInvite = 'SELECT p.username sender, i.id, i.gameroom, joined FROM private_invites i LEFT JOIN players p on p.id = i.sender WHERE i.receiver = $1'
const updatePrivateInvite = 'UPDATE private_invites SET joined = false WHERE gameroom = $1'
const deletePrivateInvite = 'DELETE FROM private_invites WHERE gameroom = $1'

 

const getPrivateGame = 'SELECT * FROM private_invites WHERE gameroom = $1'
const getPublicGame = 'SELECT * FROM public_invites WHERE gameroom = $1'

module.exports = {
    createInvite,
    createPrivateInvite,
    getInvites,
    getPrivateInvite,
    getInvite,
    deleteInvite,
    deletePrivateInvite,
    getReceivedPrivateInvite,
    getSentPrivateInvite,
    getPrivateGame,
    getPublicGame,
    updateInvite,
    updatePrivateInvite,
}