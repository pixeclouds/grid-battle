const Repo = require('./repository')
const Token = require('../../utils/token')
const { v4 } = require('uuid')
const userRepo = require('../login/repository')


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

const createPrivateInvite = async (invite) => {
    try {
        let { playerId } = await Token.verifyToken(invite.token)
        
        // check if the invite reciver exists
        let receiver = await userRepo.getPlayer(invite.receiver)
        if (receiver.length == 0 ) {
            throw Error ("Incorrect player's name")
        }

        let receiverId = receiver[0].id

        //check if username is player's own name
        if (receiverId == playerId) {
            throw Error ("you can't send an invite to yourself")
        }
        
        // check if sender has an active invite for the reciever 
        let activeInvite = await Repo.getPrivateInvite(playerId, receiverId)
        if (activeInvite.length > 0) {
            throw Error (`you have an active invite for ${invite.receiver}`)
        }
        let id = v4() 
        let gameroom = v4() // a random identifier for the game room
        await Repo.createPrivateInvite(id, sender=playerId, receiver=receiverId, gameroom)
        return `invite sent to ${invite.receiver}`

    } catch (err) {
        return err.message
        
    }
}


const getInvites = async (token) => {
    try {
        let { playerId } = await Token.verifyToken(token)
        let invites = await Repo.getInvites(playerId)
        return invites
    } catch (err) {
        console.log(err.message)
        return err.message
    }
}

const deleteInvite = async (gameroom) => {
    try {
        await Repo.deleteInvite(gameroom)
        return true
    } catch (err) {
        return false
        
    }
}

const updateInvite = async (gameroom) => {
    try {
        await Repo.updateInvite(gameroom)
        return true
    } catch (err) {
        console.log(err.message)
        return false
        
    }
}

const updatePrivateInvite = async (gameroom) => {
    try {
        await Repo.updatePrivateInvite(gameroom)
        return true
    } catch (err) {
        return false
        
    }
}




module.exports = {
    createPublicInvite,
    createPrivateInvite,
    getInvites,
    deleteInvite,
    updateInvite,
    updatePrivateInvite,
}