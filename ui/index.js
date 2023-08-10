
    let selectedCell = null;
    let currentPlayer = 'X';
    const state = {};

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
        document.getElementById('currentPlayer').textContent = currentPlayer;
        
        updateState();
        checkWin();
      }
    }

    function updateState() {
      document.querySelectorAll('.cell').forEach(cell => {
        const cellIndex = cell.classList[1];
        state[cellIndex] = cell.textContent;
      });
    }

    function checkWin() {
      const winPatterns = [
        [4, 5, 6],  // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7] // Diagonals
      ];
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (state[a] && state[a] === state[b] && state[a] === state[c]) {
          document.getElementById('winMessage').textContent = `Player ${state[a]} wins!`;
          document.getElementById('winMessage').style.display = 'block';
          return;
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
  