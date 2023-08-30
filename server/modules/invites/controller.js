const Repo = require('./repository')
const Token = require('../../utils/token')
const { v4 } = require('uuid')


const createPublicInvite = async (invite) => {
    try {
        let { playerId } = await Token.verifyToken(invite.token)

        // check if player has an open invite
        let openInvite = await Repo.getInvite(playerId)
        if (openInvite.length > 0) {
            throw Error ('you can only create 1 open invite at a time')
        }
        let id = v4() 
        let gameroom = v4() // a random identifier for a game room
        await Repo.createInvite(id, playerId, gameroom)
        return 'invite created'
    } catch (err) {
        return err.message
    }
}


const getInvites = async () => {
    try {
        let invites = await Repo.getInvites()
        return invites
    } catch (err) {
        return err.message
    }
}


module.exports = {
    createPublicInvite,
    getInvites,
}