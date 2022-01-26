const squareCount = 30
const board = document.getElementById('board')

// Populate board grid
for (let i = 0; i < squareCount; i++) {
  board.innerHTML += `
    <div class="square">
      <p>A</p>
    </div>
  `
}


