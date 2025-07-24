const timer = document.getElementById('timer');
const startButton = document.getElementById('start-timer');
const stopButton = document.getElementById('stop-timer');
const resetButton = document.getElementById('reset-timer');

const pomodoroLength = 25 * 60;
const breakLength = 5 * 60;
const longBreakLength = 30 * 60;

const pomodoroAlarm = new Audio('sounds/pomodoro.mp3');
const breakAlarm = new Audio('sounds/break.mp3');


const pomodoroLengthInput = document.getElementById('pomodoro-duration');
const shortBreakLengthInput = document.getElementById('short-break-duration');
const longBreakLengthInput = document.getElementById('long-break-duration');

let isProductive = false;
let isBreak = false;
let timeLeft = pomodoroLength;
let timerId = null;

function startCountdown() {
    if (timerId !== null) return; // Prevent multiple intervals
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            if (isProductive) {
                pomodoroAlarm.play();
                isProductive = false;
                isBreak = true;
                timeLeft = breakLength; // Switch to break
            } else if (isBreak) {
                breakAlarm.play();
                isBreak = false;
                isProductive = true;
                timeLeft = pomodoroLength; // Switch back to pomodoro
            }
        }
        else {
            timeLeft--;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function pauseCountdown() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

// Add functionality to adjust pomodoro and break lengths