let playerScore = 0;
let computerScore = 0;
let highScore = 0;
let isAutoPlaying = false;
let isMultiplayer = false;
let intervalId;
let timeLeft = 3;

// Function to randomly select computer's move
function computerPlay() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

// Function to determine the winner
function playGame(playerMove) {
    const buttons = document.querySelectorAll('.choices button');
    buttons.forEach(button => button.classList.remove('shake'));

    const playerButton = document.querySelector(`button[onclick="playGame('${playerMove}')"]`);
    playerButton.classList.add('shake');

    let computerMove;
    if (isMultiplayer) {
        computerMove = computerPlay(); // For multiplayer, Player 2 is the computer
    } else {
        computerMove = computerPlay();
    }

    updateDisplays(playerMove, computerMove);

    let result;
    if (playerMove === computerMove) {
        result = "It's a tie!";
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = isMultiplayer ? 'Player 1 wins!' : 'You win!';
        playerScore++;
    } else {
        result = isMultiplayer ? 'Player 2 wins!' : 'You lose!';
        computerScore++;
    }

    updateResultDisplay(result);
    updateScores();
    playSound(result);
}

// Function to update the displays
function updateDisplays(playerMove, computerMove) {
    document.getElementById('playerDisplay').textContent = `PLAYER: ${playerMove}`;
    document.getElementById('computerDisplay').textContent = isMultiplayer ? `PLAYER 2: ${computerMove}` : `COMPUTER: ${computerMove}`;
}

// Function to update the result display
function updateResultDisplay(result) {
    document.getElementById('resultDisplay').textContent = result;
}

// Function to update the scores
function updateScores() {
    document.getElementById('playerScoreDisplay').textContent = playerScore;
    document.getElementById('computerScoreDisplay').textContent = computerScore;

    if (playerScore > highScore) {
        highScore = playerScore;
        document.getElementById('highScoreDisplay').textContent = highScore;
    }
}

// Function to play sound effects
function playSound(result) {
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');
    const tieSound = document.getElementById('tieSound');

    if (result.includes('win')) {
        winSound.play();
    } else if (result.includes('lose')) {
        loseSound.play();
    } else {
        tieSound.play();
    }
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    updateDisplays('', '');
    updateResultDisplay('');
    stopAutoPlay();
}

// Function to enable autoplay
function autoplayGame() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        intervalId = setInterval(() => {
            const moves = ['rock', 'paper', 'scissors'];
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            playGame(randomMove);
            startTimer();
        }, 3000); // Run every 3 seconds
        document.querySelector('button[onclick="autoplayGame()"]').textContent = 'Stop Auto Play';
    } else {
        stopAutoPlay();
    }
}

// Function to stop autoplay
function stopAutoPlay() {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('button[onclick="autoplayGame()"]').textContent = 'Auto Play';
}

// Function to start the timer
function startTimer() {
    const timerDisplay = document.getElementById('timeLeft');
    timerDisplay.textContent = timeLeft;

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timeLeft = 3; // Reset timer
        }
    }, 1000);
}

// Function to switch between single-player and multiplayer modes
function switchMode() {
    isMultiplayer = !isMultiplayer;
    const player2Display = document.getElementById('player2Display');
    player2Display.style.display = isMultiplayer ? 'block' : 'none';
    resetGame(); // Reset the game when switching modes
    updateDisplays('', ''); // Clear the move displays
    updateResultDisplay(''); // Clear the result display
}