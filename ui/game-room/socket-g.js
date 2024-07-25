let socket = io('/game-room')

socket.on('connect', () => {
    let token = localStorage.getItem('token')
    let gameData = localStorage.getItem('gameData')
    gameData = JSON.parse(gameData)
    socket.emit('start-game', token, gameData)
})
socket.on('starting-game', game => {
    playerJoined(game)
})

socket.on('g-move', (data)=> {
    state = data.state
    currentPlayer = data.currentPlayer
    
    updateGameState(state)
    updateCurrentPlayer(currentPlayer)
    checkWin()
  })

socket.on('reset-game', () => {
resetGame()
})

socket.on('game-ended', () => {
    gameEnded()
})

socket.on('game-ended-error', () => {
    gameEndedError()
})

socket.on('game-start-error', err => {
    gameStartError(err)
}) 

//reset game to initial state
function resetGameState() {
    socket.emit('reset-game')
  }

function gameMove(gameData, move) {
    socket.emit('move', gameData, move)
}

function endTheGame (gameData,   playerXId, playerYId, XScore, YScore) {
    console.log(gameData)
    socket.emit('end-game', gameData,  playerXId, playerYId, XScore, YScore)
}
