const Token = require('../../utils/token')
const gameController = require('./controller')
const gameRoomNameSpace = (io) => {
    const nsp = io.of('/game-room');

    nsp.on('connection', (socket) => {
        console.log('new user connected to gameroom')

        socket.on('joinRoom',  async (roomId, token) => {
            let data = await gameController.joinGame(socket, roomId, token)
            if (data.type == 'Error') {
                socket.emit('joinError', data)
            } else {
                nsp.to(roomId).emit('roomJoined', data)
            }
        })
        socket.on('move', (roomId, data)=> {
            nsp.to(roomId).emit('g-move', data)
        })
        socket.on('reset-game', () => {
            nsp.emit('reset-game')
        })

    })
}

module.exports = gameRoomNameSpace
