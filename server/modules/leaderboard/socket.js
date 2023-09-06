const leaderboardController = require('./controller')
const leaderboardNameSpace = (io) => {
    nsp = io.of('/leaderboard')

    nsp.on('connection', (socket) => {
        console.log('user conncted to leaderboard')

        socket.on('get-top-scores', async () => {
            let scores = await leaderboardController.getTopScores()
            socket.emit('top-scores', scores)
        })

    })

}

module.exports = leaderboardNameSpace