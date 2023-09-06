const leaderboardController = require('./controller')
const leaderboardNameSpace = (io) => {
    nsp = io.of('/leaderboard')

    nsp.on('connection', (socket) => {
        console.log('user conncted to leaderboard')

        socket.on('get-score', async () => {
            let scores = await leaderboardController.getScore()
        })




    })

}

module.exports = leaderboardNameSpace