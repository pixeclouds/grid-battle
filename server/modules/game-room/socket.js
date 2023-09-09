const Token = require('../../utils/token')
const gameController = require('./controller')
const gameRoomNameSpace = (io) => {
    const nsp = io.of('/game-room');

    nsp.on('connection', (socket) => {
        console.log('new user connected to gameroom')

        socket.on('start-game', async (token, gameData) => {
            try {
                let game = await gameController.startGame(token, gameData)
                socket.join(game.gameroom)
                nsp.to(game.gameroom).emit('starting-game', game)
            } catch (err) {
                socket.emit('game-start-error', 'Join an invite to play the game')
            }

        })



        socket.on('move', (gameData, data)=> {
            nsp.to(gameData.gameroom).emit('g-move', data)
        })
        socket.on('reset-game', () => {
            nsp.emit('reset-game')
        })

        socket.on('end-game', async (gameData,  playerXId, playerYId, XScore, YScore) => {
            let ended = await gameController.endGame(gameData,  playerXId, playerYId, XScore, YScore)
            if (ended == 'success') {
                nsp.to(gameData.gameroom).emit('game-ended')
            } else {
                nsp.to(gameData.gameroom).emit('game-ended-error')

            }
        })

    })
}

module.exports = gameRoomNameSpace
