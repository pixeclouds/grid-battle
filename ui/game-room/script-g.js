
let socket = io('/game-room')
let XScore = 0
let YScore = 0

let selectedCell = null;
let currentPlayer = 'X';
//initial game state
let state = {
  'one':'X', 'two': 'X', 'three': 'X', 
  'four': '', 'five': '', 'six': '',
  'seven': 'Y', 'eight': 'Y', 'nine': 'Y',
};
socket.on('connect', () => {
    let roomId = '123487'
    let token = localStorage.getItem('token')
    socket.emit('joinRoom', roomId, token)
})

socket.on('roomJoined', data => {
    console.log(data)
})
socket.on('joinError', err => {
    console.log(err)
})
socket.on('inroom', room => {
    console.log(` you in room ${room}`)
})

socket.on('g-move', (data)=> {
  state = data.state
  currentPlayer = data.currentPlayer
  
  updateGameState(state)
  updateCurrentPlayer(currentPlayer)
  checkWin()
})


// player moves implementation
function selectCell(cell) {
  if (!selectedCell) {
    if (cell.textContent !== "" && cell.textContent === currentPlayer) {
      selectedCell = cell;
    }
  } else if (cell.textContent === "" && isAdjacent(selectedCell, cell)) {
    cell.textContent = selectedCell.textContent;
    selectedCell.textContent = "";
    selectedCell = null;
    currentPlayer = (currentPlayer === 'X') ? 'Y' : 'X';

    // updateCurrentPlayer(currentPlayer)        
    updateState();

    // emit game state to the other player
    let data = { state, currentPlayer}
    socket.emit('move', data)
    // checkWin();

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

//reset game to initial state
function resetGameState() {
  socket.emit('reset-game')
}

socket.on('reset-game', () => {
  resetGame()
})

function resetGame(){
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
// document.getElementById('x-score').innerText = 0
// document.getElementById('y-score').innerText = 0


updateGameState(state)
updateCurrentPlayer(currentPlayer)

}
