document.addEventListener("DOMContentLoaded", async function () {
    // Initialize variables
    let currentUser = localStorage.getItem('currentUser') || null; // Retrieve currentUser from localStorage
    let playerScore = 0;
    let computerScore = 0;
    let totalGamesPlayed = 0;
    let totalTies = 0;
    const MAX_GAMES = 100; // Limit of 100 games per login

    // DOM Elements
    const authSection = document.getElementById('authSection');
    const gameSection = document.getElementById('gameSection');
    const leaderboardSection = document.getElementById('leaderboardSection');
    const playerDisplay = document.getElementById('playerDisplay');
    const computerDisplay = document.getElementById('computerDisplay');
    const resultDisplay = document.getElementById('resultDisplay');
    const playerScoreDisplay = document.getElementById('playerScoreDisplay');
    const computerScoreDisplay = document.getElementById('computerScoreDisplay');
    const totalGamesDisplay = document.getElementById('totalGamesDisplay');
    const totalTiesDisplay = document.getElementById('totalTiesDisplay');
    const leaderboard = document.getElementById('leaderboard');
    const registerError = document.getElementById('registerError');
    const loginError = document.getElementById('loginError');
    const themeToggle = document.getElementById('themeToggle');
    const logoutButton = document.getElementById('logoutButton');

    const API_URL = 'http://localhost:5000';

    // Sound Effects
    const winSound = new Audio('sounds/win.mp3');
    const loseSound = new Audio('sounds/lose.mp3');
    const tieSound = new Audio('sounds/tie.mp3');

    // Theme Toggle (only on game page)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }

    // Logout Function (only on game page)
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            currentUser = null;
            localStorage.removeItem('currentUser'); // Clear currentUser from localStorage
            window.location.href = 'index.html'; // Redirect to login page
        });
    }

    // Register Function
    async function register() {
        const registerUsername = document.getElementById('registerUsername');
        const registerPassword = document.getElementById('registerPassword');
        const username = registerUsername.value.trim();
        const password = registerPassword.value.trim();

        if (username.length < 4) {
            registerError.textContent = 'Username must be at least 4 characters.';
            return;
        }
        if (password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters.';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Registration failed');
            }

            registerError.textContent = '';
            alert('Registration successful. Please login.');
            window.location.href = 'index.html'; // Redirect to login page
        } catch (error) {
            registerError.textContent = error.message;
        }
    }

    // Login Function
    async function login() {
        const loginUsername = document.getElementById('loginUsername');
        const loginPassword = document.getElementById('loginPassword');
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();

        if (!username || !password) {
            loginError.textContent = 'Enter a username and password.';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Login failed');
            }

            const data = await response.json();
            currentUser = username;
            localStorage.setItem('currentUser', currentUser); // Store currentUser in localStorage
            playerScore = data.user.score;

            window.location.href = 'app.html'; // Redirect to game page
        } catch (error) {
            loginError.textContent = error.message;
        }
    }

    // Play Game Function (only on game page)
    if (document.querySelectorAll('#gameSection .buttons button')) {
        document.querySelectorAll('#gameSection .buttons button').forEach(button => {
            button.addEventListener('click', () => {
                const playerMove = button.textContent.trim().split(" ")[0].toLowerCase();
                playGame(playerMove);
            });
        });
    }

    // Reset Game Function (only on game page)
    if (document.getElementById('resetButton')) {
        document.getElementById('resetButton').addEventListener('click', resetGame);
    }

    // Play Game Logic
    function playGame(playerMove) {
        if (!currentUser) {
            alert('Please login to play.');
            return;
        }

        if (totalGamesPlayed >= MAX_GAMES) {
            alert('You have reached the maximum number of games (100). Please reset or logout.');
            return;
        }

        const computerMove = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
        const result = getResult(playerMove, computerMove);

        playerDisplay.textContent = `PLAYER: ${playerMove}`;
        computerDisplay.textContent = `COMPUTER: ${computerMove}`;
        resultDisplay.textContent = result;

        totalGamesPlayed++;
        totalGamesDisplay.textContent = totalGamesPlayed;

        if (result === 'YOU WIN!') {
            playerScore++;
            winSound.play();
        } else if (result === 'YOU LOSE!') {
            computerScore++;
            loseSound.play();
        } else if (result === "IT'S A TIE!") {
            totalTies++;
            tieSound.play();
        }

        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        totalTiesDisplay.textContent = totalTies;

        updateScore();
        updateLeaderboard();
    }

    // Get Result Function
    function getResult(playerMove, computerMove) {
        if (playerMove === computerMove) return "IT'S A TIE!";
        if (
            (playerMove === 'rock' && computerMove === 'scissors') ||
            (playerMove === 'paper' && computerMove === 'rock') ||
            (playerMove === 'scissors' && computerMove === 'paper')
        ) return 'YOU WIN!';
        return 'YOU LOSE!';
    }

    // Update Leaderboard Function
    async function updateLeaderboard() {
        try {
            const response = await fetch(`${API_URL}/leaderboard`);
            if (!response.ok) throw new Error('Failed to fetch leaderboard');

            const data = await response.json();
            leaderboard.innerHTML = data.leaderboard
                .map((user, index) => `<li>${index + 1}. ${user.username}: ${user.score}</li>`)
                .join('');
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    }

    // Update Score Function
    async function updateScore() {
        try {
            const response = await fetch(`${API_URL}/update-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser, score: playerScore }),
            });

            if (!response.ok) throw new Error('Failed to update score');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }

    // Reset Game Function
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        totalGamesPlayed = 0;
        totalTies = 0;
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        totalGamesDisplay.textContent = totalGamesPlayed;
        totalTiesDisplay.textContent = totalTies;
        playerDisplay.textContent = '';
        computerDisplay.textContent = '';
        resultDisplay.textContent = '';

        updateScore();
    }

    // Event Listeners
    if (document.getElementById('registerButton')) {
        document.getElementById('registerButton').addEventListener('click', register);
    }
    if (document.getElementById('loginButton')) {
        document.getElementById('loginButton').addEventListener('click', login);
    }
});