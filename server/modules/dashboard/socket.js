const dashboardController = require('./controller')
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

    })
}

module.exports = dashboardNameSpace