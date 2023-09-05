const inviteRepo = require('../invites/repository')
const Token = require('../../utils/token')



const getNotification = async (token) => {
    try {
        let { playerId } = await Token.verifyToken(token)
        let public = await inviteRepo.getInvite(playerId)
        let privateR = await inviteRepo.getReceivedPrivateInvite(playerId)
        let privateS = await inviteRepo.getSentPrivateInvite(playerId)
       
        let notification = []

        public.forEach(pinvite => {
            let invite = {
                id: pinvite.id,
                gameroom: pinvite.gameroom,
                joined: pinvite.joined,
                type: 'public'
            }
            notification.push(invite)
        })

        privateR.forEach(pinvite => {
            let invite = {
                id: pinvite.id,
                gameroom: pinvite.gameroom,
                sender: pinvite.sender,
                joined: pinvite.joined,
                type: 'received'
            }
            notification.push(invite)
        })

        privateS.forEach(pinvite => {
            let invite = {
                id: pinvite.id,
                gameroom: pinvite.gameroom,
                receiver: pinvite.receiver,
                joined: pinvite.joined,
                type: 'sent'
            }
            console.log(pinvite)
            notification.push(invite)
        })

        return notification

    } catch (err) {
        console.log(err.message)
    }
}

const deleteNotification = async (gameroom, type) => {
    try {
        if (type == 'public') {
            await inviteRepo.deleteInvite(gameroom)
            return true
        } else if (type == 'private') {
            await inviteRepo.deletePrivateInvite(gameroom)
            return true
        }
    } catch (err) {
        console.log(err.message)
        return false
    }
}

module.exports = {
    getNotification,
    deleteNotification
}