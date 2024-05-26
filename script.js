const pomodoroBtn = document.querySelector("#pomodoro");
const breakBtn = document.querySelector("#break");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const timer = document.querySelector("#pomodoro-time");
const timeArray = timer.textContent.split(":");
let minutes = parseInt(timeArray[0]);
let seconds = parseInt(timeArray[1]);
let totalSeconds = minutes * 60 + seconds;

let timerId;

startBtn.addEventListener("click", function() {
    if (this.textContent === "stop") {
        clearInterval(timerId);
        this.textContent = "start";
    } else {
        timerId = setInterval(() => {
            totalSeconds--;
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;

            timer.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if (totalSeconds === 0) {
                clearInterval(timerId);
                if (pomodoroBtn.classList.contains("active")) {
                    timer.textContent = pomodoroTime;
                    totalSeconds = 25 * 60;
                } else if (breakBtn.classList.contains("active")) {
                    timer.textContent = breakTime;
                    totalSeconds = 5 * 60;
                }
                startBtn.textContent = "start";
                totalSeconds = minutes * 60 + seconds;
            }
        }, 1000);
        this.textContent = "stop";
    }
});

const pomodoroTime = "25:00";
const breakTime = "05:00";
timer.textContent = pomodoroTime;

pomodoroBtn.addEventListener("click", function() {
    clearInterval(timerId);
    timer.textContent = pomodoroTime;
    totalSeconds = 25 * 60;
    pomodoroBtn.classList.add("active");
    breakBtn.classList.remove("active");
});

breakBtn.addEventListener("click", function() {
    clearInterval(timerId);
    startBtn.textContent = "start";
    timer.textContent = breakTime;
    totalSeconds = 5 * 60;
    breakBtn.classList.add("active");
    pomodoroBtn.classList.remove("active");
});

resetBtn.addEventListener("click", function() {
    clearInterval(timerId);
    startBtn.textContent = "start";
    if (pomodoroBtn.classList.contains("active")) {
        timer.textContent = pomodoroTime;
        totalSeconds = 25 * 60;
    } else if (breakBtn.classList.contains("active")) {
        timer.textContent = breakTime;
        totalSeconds = 5 * 60;
    }
});