
const Token = require('../../utils/token')
const inviteRepo = require('../invites/repository')

// active games store
const activeGames = {
    // sample structure
    'gameroom': {
        playerX: 'playerX',
        playerY: 'playerY'
    }
}

const startGame = async (token, gameData) => {
    try {
        // let gameData = JSON.parse(gameDataRaw)

        let { playerId, username } = await Token.verifyToken(token)
        let gameroom = gameData.gameroom
        
        // check if room exists and if not, create one
        if (!activeGames[gameData.gameroom]) {
            activeGames[gameData.gameroom] = {
                playerX: '',
                playerY: ''
            }
        }

        // check if the game invite is public
        if (gameData.type == 'public') {

            let gameDetails = await inviteRepo.getPublicGame(gameroom)
            if (playerId == gameDetails[0].player_id){
                activeGames[gameroom].playerX = username
            } else {
                activeGames[gameroom].playerY = username
            }
        }
        // check if the game invite is private 
        else if ( gameData.type == 'private') {
            let gameDetails = await inviteRepo.getPrivateGame(gameroom)
            if (playerId == gameDetails[0].player_id){
                activeGames[gameroom].playerX = username

            } else {
                activeGames[gameroom].playerY = username

            }
        }

        return {
            gameroom: gameroom,
            playerX: activeGames[gameroom].playerX,
            playerY: activeGames[gameroom].playerY
        }
      
    } catch (err) {
        console.log(err.message)
    }
}

const endGame = async (gameData, XScore, YScore) => {
    try {
        if (gameData.type == 'public') {
            await inviteRepo.deleteInvite(gameData.gameroom)
        } else if (gameData.type == 'private') {
            await inviteRepo.deletePrivateInvite(gameData.gameroom)
        }

        // update players scores

        return 'success'
    } catch (err) {
        console.log(err.message)
        return 'Error'
    }
}







// const activeRooms = { 
//     'sampleroomId' : ['player1 Id', 'player2 Id']
// }

// const joinGame = async (socket, roomId, token) => {
//     try {
//         let { playerId } = await Token.verifyToken(token)

//         for (room in activeRooms ) {
//             // check if player is in an active game
//             if (activeRooms[room].includes(playerId)) {
//                 throw Error ('player still in a game room')
//             }
            
//             // check if players n room are not more than 2
//             if ((room == roomId) && (activeRooms[room].length > 1)) {
//                 throw Error ('Room is full')
//             }

//             // add player to active game room
//             socket.join(roomId)

//             if (roomId in activeRooms) {
//                 activeRooms[roomId].push(playerId)
//             } else {
//                 activeRooms[roomId] = [playerId]
//             }

//             return {
//                 roomId, 
//                 players: activeRooms[roomId],
//                 type: 'Success'
//             }
//         }

//     } catch (err) {
//         return {
//             msg: err.message, 
//             type: 'Error'
//         }
//     }
// }

module.exports = {
    // joinGame,
    startGame,
    endGame
}