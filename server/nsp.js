// namespace1.js

module.exports = function gameRoomSpace(io) {
    const nsp = io.of('/game-room');

    nsp.on('connection', (socket) => {
        console.log('new user connected to gameroom')

        socket.on('move', (data)=> {
            io.sockets.emit('g-move', data)
        })
        socket.on('reset-game', () => {
            io.sockets.emit('reset-game')
        })

    });
};
