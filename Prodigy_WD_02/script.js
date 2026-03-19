let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");

let display = document.getElementById("time");
let lapsContainer = document.getElementById("lapsList");

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let lapCount = 1;

function updateDisplay() {
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    let ms = String(milliseconds).padStart(2, '0');

    display.textContent = `${h}:${m}:${s}.${ms}`;
}

function startTimer() {
    if (timer !== null) return;

    timer = setInterval(() => {
        milliseconds++;

        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;

    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;

    lapCount = 1;
    lapsContainer.innerHTML = "";

    updateDisplay();
}

function recordLap() {
    let time = display.textContent;

    let li = document.createElement("li");
    li.innerHTML = `<span>Lap ${lapCount}</span> <span>${time}</span>`;

    lapsContainer.appendChild(li);

    lapCount++;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

updateDisplay();