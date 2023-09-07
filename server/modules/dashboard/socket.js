const dashboardController = require('./controller')
const inviteController = require('../invites/controller')
const dashboardNameSpace = (io) => {
    nsp = io.of('/dashboard')

    nsp.on('connection', (socket) => {
        console.log('connected to dashbaord')
        socket.on('get-rank', async (token) => {
            let ranking = await dashboardController.getRanking(token)
            socket.emit('rank-data', ranking)
        })

        socket.on('get-notifications', async(token) => {
            let notifications = await dashboardController.getNotification(token)
            socket.emit('notifications', notifications)
        })

        socket.on('accept-invite', async (gameroom) => {
            await dashboardController.acceptPrivateInvite(gameroom)
        })

        socket.on('delete-invite', async (token, gameroom, type) => {
            let deleted = await dashboardController.deleteNotification(gameroom, type)
            if(deleted) {
                let notifications = await dashboardController.getNotification(token)
                socket.emit('notifications', notifications)
            } else {
                socket.emit('delete-invite-error', 'Error')
            }
        })

    })
}

module.exports = dashboardNameSpace