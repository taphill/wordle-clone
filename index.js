// DOM Setup

const numberOfColumns = 5
const squareCount = 30
const board = document.getElementById('board')

function populateBoard () {
  for (let i = 0; i < squareCount; i++) {
    board.innerHTML += `
      <div class="square"></div>
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
  'hello',
  'world',
  'piano',
  'horse'
]
let randomIndex = Math.floor(Math.random() * wordList.length)
// let secretWord =  wordList[randomIndex]
let secretWord =  'hello'
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



// Main functions

function updateBoard () {
  drawCurrentAttempt(rows[0], currentAttempt)
}

function drawCurrentAttempt (row, attempt) {
  row.forEach((square, index) => {
    let letter = attempt[index] ?? ''
    square.textContent = `${letter}`
    updateBgColor(square, index)
  })
}



// Helper functions

function updateBgColor (square, index) {
  let currentLetter = square.textContent
  let correctLetter = secretWord[index]

  if (correctLetterAndPosition(currentLetter, correctLetter)) {
    square.classList.add('bg-correct-letter-postion')
  } else if (correctLetterWrongPosition(currentLetter, correctLetter)) {
    square.classList.add('bg-correct-letter')
  } else if (incorrectLetter(currentLetter, correctLetter)) {
    square.classList.add('bg-incorrect-letter')
  } else {
    square.classList.remove('bg-correct-letter-postion', 'bg-correct-letter', 'bg-incorrect-letter')
  }
}

function correctLetterAndPosition (currentLetter, correctLetter) {
  return currentLetter === correctLetter
}

function correctLetterWrongPosition (currentLetter, correctLetter) {
  return currentLetter !== '' && secretWord.includes(currentLetter)
}

function incorrectLetter (currentLetter, correctLetter) {
  return currentLetter !== '' && !secretWord.includes(currentLetter)
}



// Calls

populateBoard()
generateRows()
