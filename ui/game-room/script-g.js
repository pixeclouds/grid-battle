
let XScore = 0
let YScore = 0

/*
Initialized myDevice to manage player device. 
It prevent a player from playing the other player's move
*/
let myDevice 

let selectedCell = null
let currentPlayer = 'X'

//initial game state
let state = {
  'one':'X', 'two': 'X', 'three': 'X', 
  'four': '', 'five': '', 'six': '',
  'seven': 'Y', 'eight': 'Y', 'nine': 'Y',
}



function playerJoined (game) {
    let playerX = document.querySelector('.player-x')
    let playerY = document.querySelector('.player-y')

     /* invite creator takes the first move (X), the code below therefore
        assign a corresponding value to myDevice. it also shows if a player has joined
        the game room by changing the shadow around his name from yellow to green 
     */ 
    if (game.playerX != '') {
        if (myDevice == undefined){
            myDevice = 'X'
        }
        playerX.firstChild.textContent = `${game.playerX} (X): `
        playerX.classList.remove('player')
        playerX.classList.add('player-active')
    }
    if (game.playerY != '')  {
        if (myDevice == undefined){
            myDevice = 'Y'
        }
        playerY.firstChild.textContent = `${game.playerY} (Y): `
        playerY.classList.remove('player')
        playerY.classList.add('player-active')

    }
}



// player moves implementation
function selectCell(cell) {
   
    if (currentPlayer == myDevice) {
        if (!selectedCell) {
            if (cell.textContent !== "" && cell.textContent === currentPlayer) {
              selectedCell = cell;
            }
          } else if (cell.textContent === "" && isAdjacent(selectedCell, cell)) {
            cell.textContent = selectedCell.textContent;
            selectedCell.textContent = "";
            selectedCell = null;
            currentPlayer = (currentPlayer === 'X') ? 'Y' : 'X'
        
            updateState()
        
            // emit game state to the other player
            let move = { state, currentPlayer}
            let gameData = JSON.parse(localStorage.getItem('gameData'))
            gameMove(gameData, move)

          }
    }
}

function isAdjacent(cell1, cell2) {
  const cell1Index = Array.from(document.querySelectorAll('.cell')).indexOf(cell1);
  const cell2Index = Array.from(document.querySelectorAll('.cell')).indexOf(cell2);
  const rowIndexDiff = Math.abs(Math.floor(cell1Index / 3) - Math.floor(cell2Index / 3));
  const colIndexDiff = Math.abs(cell1Index % 3 - cell2Index % 3);
  return rowIndexDiff <= 1 && colIndexDiff <= 1;
}

// manage game state
function updateState() {
  document.querySelectorAll('.cell').forEach(cell => {
    const cellIndex = cell.classList[1];
    state[cellIndex] = cell.textContent;
  });
}

function updateGameState(state){
  document.querySelectorAll('.cell').forEach(cell => {
    let cellIndex = cell.classList[1]
    cell.textContent = state[cellIndex]
  })
}

function updateCurrentPlayer(currentPlayer){
  document.getElementById('currentPlayer').textContent = currentPlayer;

}

function checkWin() {
  const winPatterns = [
    ['four', 'five', 'six'], //Rows
    ['one', 'four', 'seven'], ['two', 'five', 'eight'], ['three','six', 'nine' ], //Columns
    ['one', 'five', 'nine'], ['three', 'five', 'seven'] // Diagonals
    
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      document.getElementById('winMessage').textContent = `Player ${state[a]} wins!`;
      document.getElementById('winMessage').style.display = 'block';

      showWinningCells([a, b, c])
      updateWinnerScore(player=state[a])
      updateRoundsPlayed()
    }
  }
}

function updateWinnerScore(player){
  if (player === 'X'){
    XScore++
    document.getElementById('x-score').textContent = XScore
  } else {
    YScore++
    document.getElementById('y-score').textContent = YScore
  }
}

function updateRoundsPlayed() {
  let rounds = document.getElementById('rounds')
  round = parseInt(rounds.innerText) + 1
  rounds.innerText = round
}

function showWinningCells(cells){
  cells.forEach( cell => {
      document.querySelector(`.${cell}`).style.background = 'lightgreen'
  })
}


function resetGame() {
    currentPlayer = 'X';
    state = {
    'one':'X', 'two': 'X', 'three': 'X', 
    'four': '', 'five': '', 'six': '',
    'seven': 'Y', 'eight': 'Y', 'nine': 'Y',
    };

    document.querySelectorAll('.cell').forEach(cell => {
    cell.style.background = ''
    })
    document.getElementById('winMessage').style.display = 'none';

    updateGameState(state)
    updateCurrentPlayer(currentPlayer)

}

function endGame () {
    let XScore =  document.getElementById('x-score').textContent
    let YScore =  document.getElementById('y-score').textContent
    let gameData = JSON.parse(localStorage.getItem('gameData'))

    endTheGame(gameData, XScore, YScore)

}

function gameEnded() {
    window.alert('Game ended...')
    localStorage.removeItem('gameData')
    window.location.href = '/invites'
}

function gameEndedError() {
    window.alert('Error. Try again.')
}


