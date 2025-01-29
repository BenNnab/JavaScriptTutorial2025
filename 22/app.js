let countdown;
let timeLeft;
let isRunning = false;

const display = document.getElementById('display');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeUpMessage = document.getElementById('timeUp');  // The div where "Time's up!" will appear

function start() {
    if (isRunning) return; // Prevent multiple starts

    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
        alert("Please enter valid time values (HH:MM:SS).");
        return;
    }

    timeLeft = hours * 3600 + minutes * 60 + seconds;
    if (timeLeft <= 0) {
        alert("Please enter a time greater than 0.");
        return;
    }

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    timeUpMessage.textContent = "";  // Clear the "Time's up!" message if any

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            isRunning = false;
            display.textContent = "00:00:00";
            timeUpMessage.textContent = "Time's up!";  // Display "Time's up!" in the div
            startBtn.disabled = false;
            stopBtn.disabled = true;
            return;
        }

        timeLeft--;
        updateDisplay();
    }, 1000);
}

function stop() {
    clearInterval(countdown);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function reset() {
    clearInterval(countdown);
    isRunning = false;
    timeLeft = 0;
    display.textContent = "00:00:00";
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    timeUpMessage.textContent = "";  // Clear the "Time's up!" message when resetting
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
}

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Disable stop and reset buttons initially
stopBtn.disabled = true;
resetBtn.disabled = true;
