// DOM Setup

let rows = []
let currentRow = null
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

  for (let i = 0; i < squares.length; i += numberOfColumns) {
    const row = squares.slice(i, i + numberOfColumns)
    rows.push(row)
  }

  currentRow = rows[0]
}

populateBoard()
generateRows()



// Variables

let wordList = [
  'hello',
  'world',
  'piano',
  'horse'
]
let randomIndex = Math.floor(Math.random() * wordList.length)
let secretWord =  wordList[randomIndex]
let currentAttempt = ''
let attempts = []



// Event listeners

document.addEventListener('keydown', updateCurrentAttempt)



// Handlers

function updateCurrentAttempt (event) {
  if (keyPressWasCharacter(event)) {
    currentAttempt += `${event.key}`

    if (currentAttemptIsToLong()) {
      currentAttempt = currentAttempt.substring(0, numberOfColumns)
    }

    updateBoard()
  }

  if (keyPressWasDelete(event)) {
    currentAttempt = currentAttempt.slice(0, -1)
    updateBoard()
  }

  if (keyPressWasEnterAndThereAreEnoughWords(event)) {
    reveal(currentRow)
  }
}



// Main functions

function updateBoard () {
  drawCurrentAttempt(currentRow, currentAttempt)
}

function drawCurrentAttempt (row, attempt) {
  row.forEach((square, index) => {
    let letter = attempt[index] ?? ''
    square.textContent = `${letter}`
  })
}

function reveal (row) {
  row.forEach((square, index) => {
    updateBgColor(square, index)
  })

  attempts.push(currentAttempt)
  let index = attempts.length
  currentRow = rows[index]
  currentAttempt = ''
}

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



// Helper functions

function keyPressWasCharacter (event) {
  return event.keyCode >= 65 && event.keyCode <= 90
}

function keyPressWasDelete (event) {
  return event.key === 'Backspace' || event.key === 'Delete'
}

function keyPressWasEnterAndThereAreEnoughWords (event) {
  return event.key === 'Enter' && currentAttempt.length === numberOfColumns
}

function currentAttemptIsToLong () {
  return currentAttempt.length > numberOfColumns
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
