document.addEventListener("DOMContentLoaded", async function () {
    // Initialize variables
    let currentUser = null;
    let playerScore = 0;
    let computerScore = 0;
    let totalGamesPlayed = 0; // Track total games played
    let totalTies = 0; // Track total ties

    // Get references to the display elements
    const authSection = document.getElementById('authSection');
    const gameSection = document.getElementById('gameSection');
    const leaderboardSection = document.getElementById('leaderboardSection');
    const playerDisplay = document.getElementById('playerDisplay');
    const computerDisplay = document.getElementById('computerDisplay');
    const resultDisplay = document.getElementById('resultDisplay');
    const playerScoreDisplay = document.getElementById('playerScoreDisplay');
    const computerScoreDisplay = document.getElementById('computerScoreDisplay');
    const totalGamesDisplay = document.getElementById('totalGamesDisplay'); // New element
    const totalTiesDisplay = document.getElementById('totalTiesDisplay'); // New element
    const leaderboard = document.getElementById('leaderboard');
    const registerError = document.getElementById('registerError');
    const loginError = document.getElementById('loginError');

    // Function to hash passwords using Web Crypto API
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    // Function to register a new user
    async function register() {
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (username.length < 4) {
            registerError.textContent = 'Username must be at least 4 characters.';
            return;
        }
        if (password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            registerError.textContent = 'Username already exists. Choose another.';
            return;
        }

        const hashedPassword = await hashPassword(password);
        users[username] = { password: hashedPassword, score: 0 };

        try {
            localStorage.setItem('users', JSON.stringify(users));
            registerError.textContent = '';
            alert('Registration successful. Please login.');
        } catch (error) {
            console.error('Failed to save user data:', error);
            alert('Failed to save user data.');
        }
    }

    // Function to login
    async function login() {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!username || !password) {
            loginError.textContent = 'Enter a username and password.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        const user = users[username];

        if (!user || (await hashPassword(password)) !== user.password) {
            loginError.textContent = 'Invalid username or password.';
            return;
        }

        currentUser = username;
        playerScore = user.score;

        authSection.style.display = 'none';
        gameSection.style.display = 'block';
        leaderboardSection.style.display = 'block';
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        updateLeaderboard();
    }

    // Function to play the game
    function playGame(playerMove) {
        if (!currentUser) {
            alert('Please login to play.');
            return;
        }

        const computerMove = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
        const result = getResult(playerMove, computerMove);

        playerDisplay.textContent = `PLAYER: ${playerMove}`;
        computerDisplay.textContent = `COMPUTER: ${computerMove}`;
        resultDisplay.textContent = result;

        // Update total games played
        totalGamesPlayed++;
        totalGamesDisplay.textContent = totalGamesPlayed;

        if (result === 'YOU WIN!') playerScore++;
        else if (result === 'YOU LOSE!') computerScore++;
        else if (result === "IT'S A TIE!") totalTies++; // Update total ties

        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        totalTiesDisplay.textContent = totalTies; // Update ties display

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[currentUser]) {
            users[currentUser].score = playerScore;
            localStorage.setItem('users', JSON.stringify(users));
            updateLeaderboard();
        }
    }

    // Function to determine the result
    function getResult(playerMove, computerMove) {
        if (playerMove === computerMove) {
            return "IT'S A TIE!";
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
        leaderboard.innerHTML = Object.entries(users)
            .map(([username, data]) => ({ username, score: data.score }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((user, index) => `<li>${index + 1}. ${user.username}: ${user.score}</li>`)
            .join('');
    }

    // Function to reset the game
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

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[currentUser]) {
            users[currentUser].score = playerScore;
            localStorage.setItem('users', JSON.stringify(users));
            updateLeaderboard();
        }
    }

    // Function to logout
    function logout() {
        currentUser = null;
        authSection.style.display = 'block';
        gameSection.style.display = 'none';
        leaderboardSection.style.display = 'none';
        resetGame();
    }

    // Event listeners
    document.getElementById('registerButton').addEventListener('click', register);
    document.getElementById('loginButton').addEventListener('click', login);
    document.querySelectorAll('#gameSection button').forEach(button => {
        button.addEventListener('click', () => playGame(button.textContent.toLowerCase()));
    });
    document.getElementById('resetButton').addEventListener('click', resetGame);
    document.getElementById('logoutButton').addEventListener('click', logout);
});