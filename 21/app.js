let startTime;
let elapsedTime = 0;
let timerInterval;

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
}

function stop() {
    clearInterval(timerInterval);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}