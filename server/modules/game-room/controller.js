
const Token = require('../../utils/token')
const inviteRepo = require('../invites/repository')
const leaderboardRepo = require('../leaderboard/repository')

// active games store
const activeGames = {
    // sample structure
    'gameroom': {
        playerX: 'playerX',
        playerY: 'playerY',
        playerXId: 'fkf-rfgf',
        playerYId: 'djwpe-lfw'
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
                playerY: '',
                playerXId: '',
                playerYId: ''
            }
        }

        // check if the game invite is public
        if (gameData.type == 'public') {

            let gameDetails = await inviteRepo.getPublicGame(gameroom)
            if (playerId == gameDetails[0].player_id){
                activeGames[gameroom].playerX = username
                activeGames[gameroom].playerXId = playerId
            } else {
                activeGames[gameroom].playerY = username
                activeGames[gameroom].playerYId = playerId

            }
        }
        // check if the game invite is private 
        else if ( gameData.type == 'private') {
            let gameDetails = await inviteRepo.getPrivateGame(gameroom)
            if (playerId == gameDetails[0].sender){
                activeGames[gameroom].playerX = username
                activeGames[gameroom].playerXId = playerId

            } else {
                activeGames[gameroom].playerY = username
                activeGames[gameroom].playerYId = playerId

            }

        
        }

        return {
            gameroom: gameroom,
            playerX: activeGames[gameroom].playerX,
            playerY: activeGames[gameroom].playerY,
            playerXId: activeGames[gameroom].playerXId,
            playerYId: activeGames[gameroom].playerYId

        }
      
    } catch (err) {
        throw err
    }
}

const endGame = async (gameData,  playerXId, playerYId, XScore, YScore) => {
    try {
        if (gameData.type == 'public') {
            await inviteRepo.deleteInvite(gameData.gameroom)
        } else if (gameData.type == 'private') {
            await inviteRepo.deletePrivateInvite(gameData.gameroom)
        }

        // remove room from active rooms
        delete activeGames[gameData.gameroom]

        // update players scores
        await leaderboardRepo.updateScore(playerXId, XScore)
        await leaderboardRepo.updateScore(playerYId, YScore)

        return 'success'
        
    } catch (err) {
        console.log(err.message)
        return 'Error'
    }
}







module.exports = {
    startGame,
    endGame
}