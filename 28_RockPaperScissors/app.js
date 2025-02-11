const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;

    let result = "";
    if (playerChoice === computerChoice) {
        result = "It's a Tie!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = (computerChoice === "scissors") ? "You Win!" : "You Lose!";
                break;
            case "paper":
                result = (computerChoice === "rock") ? "You Win!" : "You Lose!";
                break;
            case "scissors":
                result = (computerChoice === "paper") ? "You Win!" : "You Lose!";
                break;
        }
    }

    resultDisplay.textContent = result;

    if (result === "You Win!") {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
    } else if (result === "You Lose!") {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }

    resultDisplay.classList.remove("win", "lose", "tie");
    if (result === "You Win!") {
        resultDisplay.classList.add("win");
    } else if (result === "You Lose!") {
        resultDisplay.classList.add("lose");
    } else {
        resultDisplay.classList.add("tie");
    }
}