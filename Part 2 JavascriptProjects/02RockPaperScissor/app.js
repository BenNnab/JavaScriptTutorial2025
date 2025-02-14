// Initialize scores
let playerScore = 0;
let computerScore = 0;

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    playerDisplay.textContent = 'PLAYER:';
    computerDisplay.textContent = 'COMPUTER:';
    resultDisplay.textContent = '';
}

// Get references to the display elements
const playerDisplay = document.getElementById('playerDisplay');
const computerDisplay = document.getElementById('computerDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const playerScoreDisplay = document.getElementById('playerScoreDisplay');
const computerScoreDisplay = document.getElementById('computerScoreDisplay');

// Function to play the game
function playGame(playerMove) {
    // Step 1: Computer randomly selects a move
    const computerMove = getComputerMove();

    // Step 2: Compare the moves to get the result
    const result = getResult(playerMove, computerMove);

    // Step 3: Update the displays
    playerDisplay.textContent = `PLAYER: ${playerMove}`;
    computerDisplay.textContent = `COMPUTER: ${computerMove}`;
    resultDisplay.textContent = result;

    // Update scores
    if (result === 'YOU WIN!') {
        playerScore++;
    } else if (result === 'YOU LOSE!') {
        computerScore++;
    }

    // Update score displays
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

// Function to get the computer's move
function getComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

// Function to determine the result
function getResult(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 'IT\'S A TIE!';
    }

    if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        return 'YOU WIN!';
    }

    return 'YOU LOSE!';
}