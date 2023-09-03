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
                type: 'public'
            }
            notification.push(invite)
        })

        privateR.forEach(pinvite => {
            let invite = {
                id: pinvite.id,
                gameroom: pinvite.gameroom,
                invitee: pinvite.invitee,
                type: 'received'
            }
            notification.push(invite)
        })

        privateS.forEach(pinvite => {
            let invite = {
                id: pinvite.id,
                gameroom: pinvite.gameroom,
                invited: pinvite.invited,
                type: 'sent'
            }
            notification.push(invite)
        })

        return notification

    } catch (err) {
        console.log(err.message)
    }
}


module.exports = {
    getNotification
}