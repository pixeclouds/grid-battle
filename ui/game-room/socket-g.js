let socket = io('/game-room')

socket.on('connect', () => {
    let token = localStorage.getItem('token')
    let gameData = localStorage.getItem('gameData')
    gameData = JSON.parse(gameData)
    socket.emit('start-game', token, gameData)
})
socket.on('starting-game', game => {
    // console.log('game data',game)
    console.log(game)
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

//reset game to initial state
function resetGameState() {
    socket.emit('reset-game')
  }

function gameMove(gameData, move) {
    socket.emit('move', gameData, move)
}

function endTheGame (gameData, playerX, XScore, playerY, YScore) {
    socket.emit('end-game', gameData, playerX, XScore, playerY, YScore)
}
