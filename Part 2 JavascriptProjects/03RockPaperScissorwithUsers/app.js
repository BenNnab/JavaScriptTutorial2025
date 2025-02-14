// Use ES Modules to import bcryptjs
// import bcrypt from 'bcryptjs';
// const bcrypt = require("bcryptjs");


// Debugging: Check if bcrypt is loaded
// console.log('bcrypt loaded:', typeof bcrypt !== 'undefined');

console.log('bcrypt loaded:', typeof window.bcrypt !== 'undefined');



// Initialize variables
let currentUser = null;
let playerScore = 0;
let computerScore = 0;

// Get references to the display elements
const authSection = document.getElementById('authSection');
const gameSection = document.getElementById('gameSection');
const leaderboardSection = document.getElementById('leaderboardSection');
const playerDisplay = document.getElementById('playerDisplay');
const computerDisplay = document.getElementById('computerDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const playerScoreDisplay = document.getElementById('playerScoreDisplay');
const computerScoreDisplay = document.getElementById('computerScoreDisplay');
const leaderboard = document.getElementById('leaderboard');
const registerError = document.getElementById('registerError');
const loginError = document.getElementById('loginError');

// Function to register a new user
function register() {
    console.log('Register button clicked'); // Debugging
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    // Input validation
    if (username.length < 4) {
        registerError.textContent = 'Username must be at least 4 characters.';
        return;
    }
    if (password.length < 6) {
        registerError.textContent = 'Password must be at least 6 characters.';
        return;
    }

    // Check if the user already exists
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        registerError.textContent = 'Username already exists. Please choose another.';
        return;
    }

    // Hash the password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(password, salt);

    // Hash a password
    const salt = window.bcrypt.genSaltSync(10);
    const hashedPassword = window.bcrypt.hashSync("mypassword", salt);
    console.log("Hashed Password:", hashedPassword);


    // Save the new user
    users[username] = { password: hashedPassword, score: 0 };
    try {
        localStorage.setItem('users', JSON.stringify(users));
        registerError.textContent = '';
        alert('Registration successful. Please login.');
    } catch (error) {
        console.error('Failed to save user data:', error);
        alert('Failed to save user data. Please try again.');
    }
}

// Function to login
function login() {
    console.log('Login button clicked'); // Debugging
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Input validation
    if (!username || !password) {
        loginError.textContent = 'Please enter a username and password.';
        return;
    }

    // Check if the user exists
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username] || !bcrypt.compareSync(password, users[username].password)) {
        loginError.textContent = 'Invalid username or password.';
        return;
    }

    // Set the current user
    currentUser = username;
    playerScore = users[username].score;

    // Update the UI
    authSection.style.display = 'none';
    gameSection.style.display = 'block';
    leaderboardSection.style.display = 'block';
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    updateLeaderboard();
}

// Rest of the code remains the same...

// Function to play the game
function playGame(playerMove) {
    if (!currentUser) {
        alert('Please login to play.');
        return;
    }

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

    // Save the player's score to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[currentUser]) {
        users[currentUser].score = playerScore;
        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard();
    }
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

// Function to update the leaderboard
function updateLeaderboard() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const sortedUsers = Object.keys(users)
        .map(username => ({ username, score: users[username].score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Top 5 users

    leaderboard.innerHTML = sortedUsers
        .map((user, index) => `<li>${index + 1}. ${user.username}: ${user.score}</li>`)
        .join('');
}