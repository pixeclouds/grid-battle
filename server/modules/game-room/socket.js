
const gameRoomNameSpace = (io) => {
    const nsp = io.of('/game-room');

    nsp.on('connection', (socket) => {
        console.log('new user connected to gameroom')

        socket.on('move', (data)=> {
            nsp.emit('g-move', data)
        })
        socket.on('reset-game', () => {
            nsp.emit('reset-game')
        })

    })
}

module.exports = gameRoomNameSpace
