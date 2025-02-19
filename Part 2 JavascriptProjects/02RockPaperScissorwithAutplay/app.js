// Variables to hold scores
let playerScore = 0;
let computerScore = 0;

// Function to play the game
function playGame(playerChoice) {
    // Randomly choose the computer's move
    const moves = ['rock', 'paper', 'scissors'];
    const computerChoice = moves[Math.floor(Math.random() * 3)];
    
    // Display player and computer choices
    document.getElementById("playerDisplay").textContent = `PLAYER: ${playerChoice.toUpperCase()}`;
    document.getElementById("computerDisplay").textContent = `COMPUTER: ${computerChoice.toUpperCase()}`;
    
    // Determine the winner
    const result = determineWinner(playerChoice, computerChoice);
    document.getElementById("resultDisplay").textContent = result;
    
    // Update scores based on the result
    if (result === "You win!") {
        playerScore++;
    } else if (result === "Computer wins!") {
        computerScore++;
    }
    
    // Update score display
    document.getElementById("playerScoreDisplay").textContent = playerScore;
    document.getElementById("computerScoreDisplay").textContent = computerScore;
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById("playerScoreDisplay").textContent = playerScore;
    document.getElementById("computerScoreDisplay").textContent = computerScore;
    document.getElementById("playerDisplay").textContent = "PLAYER:";
    document.getElementById("computerDisplay").textContent = "COMPUTER:";
    document.getElementById("resultDisplay").textContent = "";
}

// Function to autoplay the game
function autoplayGame() {
    let choices = ['rock', 'paper', 'scissors'];
    let interval = setInterval(() => {
        let randomChoice = choices[Math.floor(Math.random() * 3)];
        playGame(randomChoice);
    }, 1000);
    
    // Stop autoplay after 5 rounds
    setTimeout(() => {
        clearInterval(interval);
        alert("Autoplay finished!");
    }, 5000); // Stops after 5 seconds (5 rounds)
}
