const pomodoroBtn = document.querySelector("#pomodoro");
const breakBtn = document.querySelector("#break");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
let timer = document.querySelector("#pomodoro-time");
let timeArray = timer.textContent.split(":");
let minutes = parseInt(timeArray[0]);
let seconds = parseInt(timeArray[1]);
let totalSeconds = minutes * 60 + seconds;

let timerId;

startBtn.addEventListener("click", function() {
    if (this.innerHTML === "stop") {
        clearInterval(timerId);
        this.innerHTML = "start";
    } else {
        timerId = setInterval(() => {
            totalSeconds--;
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;

            timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if (totalSeconds === 0) {
                clearInterval(timerId);
                timer.textContent = "25:00";
                startBtn.innerHTML = "start";
                minutes = 25;
                seconds = 0;
                totalSeconds = minutes * 60 + seconds;
            }
        }, 1000);
        this.innerHTML = "stop";
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
    timer.textContent = breakTime;
    totalSeconds = 5 * 60;
    breakBtn.classList.add("active");
    pomodoroBtn.classList.remove("active");
});

resetBtn.addEventListener("click", function() {
    clearInterval(timerId);
    if (pomodoroBtn.classList.contains("active")) {
        timer.textContent = pomodoroTime;
        totalSeconds = 25 * 60;
    } else if (breakBtn.classList.contains("active")) {
        timer.textContent = breakTime;
        totalSeconds = 5 * 60;
    }
});