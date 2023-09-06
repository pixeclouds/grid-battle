
const leaderboardNameSpace = (io) => {
    nsp = io.of('/leaderboard')

    nsp.on('connection', (socket) => {
        console.log('user conncted to leaderboard')

        // socket.on('update-score', async (token, score) => {
        //     let 
        // })


    })

}

module.exports = leaderboardNameSpace