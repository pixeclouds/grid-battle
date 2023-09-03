
const Token = require('../../utils/token')

const activeRooms = { 
    'sampleroomId' : ['player1 Id', 'player2 Id']
}

const joinGame = async (socket, roomId, token) => {
    try {
        let { playerId } = await Token.verifyToken(token)
        
        for (room in activeRooms ) {
            // check if player is in an active game
            if (activeRooms[room].includes(playerId)) {
                throw Error ('player still in a game room')
            }
            
            // check if players n room are not more than 2
            if ((room == roomId) && (activeRooms[room].length > 1)) {
                throw Error ('Room is full')
            }

            // add player to active game room
            socket.join(roomId)

            if (roomId in activeRooms) {
                activeRooms[roomId].push(playerId)
            } else {
                activeRooms[roomId] = [playerId]
            }

            return {
                roomId, 
                players: activeRooms[roomId],
                type: 'Success'
            }
        }

    } catch (err) {
        return {
            msg: err.message, 
            type: 'Error'
        }
    }
}

module.exports = {
    joinGame
}