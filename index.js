// DOM Setup

const numberOfColumns = 5
const squareCount = 30
const board = document.getElementById('board')

function populateBoard () {
  for (let i = 0; i < squareCount; i++) {
    board.innerHTML += `
      <div id="${i + 1}" class="square">
        <p></p>
      </div>
    `
  }
}

function generateRows () {
  let squares = Array.from(document.querySelectorAll('.square'))

  rows = []
  for (let i = 0; i < squares.length; i += numberOfColumns) {
    const row = squares.slice(i, i + numberOfColumns)
    rows.push(row)
  }
}



// Variables

let wordList = [
  'patio',
  'darts',
  'piano',
  'horse'
]
let randomIndex = Math.floor(Math.random() * wordList.length)
let secretWord =  wordList[randomIndex]
let currentAttempt = ''
let attempts = []
let rows = null



// Event Listeners

document.addEventListener('keydown', updateCurrentAttempt)



// Handlers

function updateCurrentAttempt (event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    let key = event.key
    currentAttempt += `${key}`

    if (currentAttempt.length > numberOfColumns) {
      currentAttempt = currentAttempt.substring(0, numberOfColumns)
    }
  }

  if (event.key === "Backspace" || event.key === "Delete") {
    currentAttempt = currentAttempt.slice(0, -1)
  }

  updateBoard()
}



// Helper functions

function updateBoard () {
  drawCurrentAttempt(rows[0], currentAttempt)
}

function drawCurrentAttempt (row, attempt) {
  upcaseAttempt = attempt.toUpperCase()

  row.forEach((square, index) => {
    let letter = upcaseAttempt[index] ?? ''
    square.firstElementChild.textContent = `${letter}`
  })
}



// Calls

populateBoard()
generateRows()
