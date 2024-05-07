const ttClockList = [
    { "1 LEVEL": ["1K", "2K"] },
    { "2 LEVEL": ["2K", "4K"] },
    { "3 LEVEL": ["4K", "8K"] },
    { "4 LEVEL": ["8K", "16K"] },
    { "5 LEVEL": ["10K", "20K"] },
    { "BREAK": "BREAK" },
    { "6 LEVEL": ["15K", "30K"] },
    { "7 LEVEL": ["30K", "60K"] },
    { "8 LEVEL": ["40K", "80K"] },
    { "9 LEVEL": ["50K", "100K"] },
    { "10 LEVEL": ["60K", "120K"] },
    { "BREAK": "BREAK" },
    { "11 LEVEL": ["70K", "140K"] },
    { "12 LEVEL": ["80K", "160K"] },
    { "13 LEVEL": ["100K", "200K"] },
    { "14 LEVEL": ["120K", "240K"] },
    { "15 LEVEL": ["150K", "300K"] },
]

const jjClockList = [
    { "1 LEVEL": ["1K", "2K"] },
    { "2 LEVEL": ["2K", "4K"] },
    { "3 LEVEL": ["3K", "6K"] },
    { "4 LEVEL": ["4K", "8K"] },
    { "5 LEVEL": ["5K", "10K"] },
    { "BREAK": "BREAK" },
    { "6 LEVEL": ["6K", "12K"] },
    { "7 LEVEL": ["8K", "16K"] },
    { "8 LEVEL": ["10K", "20K"] },
    { "9 LEVEL": ["15K", "30K"] },
    { "10 LEVEL": ["20K", "40K"] },
    { "BREAK": "BREAK" },
    { "11 LEVEL": ["30K", "60K"] },
    { "12 LEVEL": ["40K", "80K"] },
    { "13 LEVEL": ["50K", "100K"] },
    { "14 LEVEL": ["60K", "120K"] },
    { "15 LEVEL": ["80K", "160K"] },
    { "BREAK": "BREAK" },
    { "16 LEVEL": ["100K", "200K"] },
    { "17 LEVEL": ["150K", "300K"] },
    { "18 LEVEL": ["200K", "400K"] },
    { "19 LEVEL": ["250K", "500K"] },
    { "20 LEVEL": ["300K", "600K"] },
];

const qqClockList = [
    { "1 LEVEL": ["1K", "2K"] },
    { "2 LEVEL": ["2K", "4K"] },
    { "3 LEVEL": ["3K", "4K"] },
    { "4 LEVEL": ["3K", "6K"] },
    { "5 LEVEL": ["4K", "8K"] },
    { "BREAK": "BREAK" },
    { "6 LEVEL": ["5K", "10K"] },
    { "7 LEVEL": ["6K", "10K"] },
    { "8 LEVEL": ["6K", "12K"] },
    { "9 LEVEL": ["8K", "16K"] },
    { "10 LEVEL": ["10K", "20K"] },
    { "BREAK": "BREAK" },
    { "11 LEVEL": ["15K", "20K"] },
    { "12 LEVEL": ["15K", "30K"] },
    { "13 LEVEL": ["20K", "40K"] },
    { "14 LEVEL": ["25K", "50K"] },
    { "15 LEVEL": ["30K", "60K"] },
    { "BREAK": "BREAK" },
    { "16 LEVEL": ["40K", "80K"] },
    { "17 LEVEL": ["50K", "100K"] },
    { "18 LEVEL": ["60K", "120K"] },
    { "19 LEVEL": ["70K", "140K"] },
    { "20 LEVEL": ["80K", "160K"] },
]


const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const minUpButton = document.querySelector('.minup');
const minDownButton = document.querySelector('.mindown');
const levelElement = document.querySelector('.level');
const clockElement = document.querySelector('.clock');
const chipElement = document.querySelector('.chip');
const anteElement = document.querySelector('.ante');
const ttClockButton = document.querySelector('.ttClock');
const jjClockButton = document.querySelector('.jjClock');
const qqClockButton = document.querySelector('.qqClock');
const clockInput = document.querySelector('#clockInput');

let currentLevelIndex = 0;

let minutes = 10;
let seconds = 0;
let timer;
let clockList = [];

prevButton.addEventListener('click', function () {
    if (currentLevelIndex > 0) {
        currentLevelIndex--;
        updateLevel();
    }
});

nextButton.addEventListener('click', function () {
    if (currentLevelIndex < clockList.length - 1) {
        currentLevelIndex++;
        updateLevel();
    }
});

minUpButton.addEventListener('click', function () {
    if (minutes === 9) {
        minutes = 10;
        seconds = 0;
        clearTimeout(timer); // 이전 타이머 중지
        updateClock()
    } else if (minutes < 9) {
        minutes++;
        seconds++;
        clearTimeout(timer); // 이전 타이머 중지
        updateClock()

    }
});

minDownButton.addEventListener('click', function () {
    minutes--;
    seconds++;
    clearTimeout(timer); // 이전 타이머 중지
    updateClock()
});

ttClockButton.addEventListener('click', function () {
    clockInput.value = 7;
    seconds = 0;
    currentLevelIndex = 0;
    clockList = ttClockList;
    clearTimeout(timer); // 이전 타이머 중지
    updateLevel();
});

jjClockButton.addEventListener('click', function () {
    clockInput.value = 10;
    seconds = 0;
    currentLevelIndex = 0;
    clockList = jjClockList;
    clearTimeout(timer); // 이전 타이머 중지
    updateLevel();
});

qqClockButton.addEventListener('click', function () {
    clockInput.value = 15;
    seconds = 0;
    currentLevelIndex = 0;
    clockList = qqClockList;
    clearTimeout(timer); // 이전 타이머 중지
    updateLevel();
});

function updateLevel() {
    playSound();
    const currentLevelInfo = clockList[currentLevelIndex];
    const levelName = Object.keys(currentLevelInfo)[0];
    const leveLEVELalues = currentLevelInfo[levelName];
    const anteValue = leveLEVELalues[1];

    chipElement.innerText = `${leveLEVELalues[0]} / ${leveLEVELalues[1]}`;
    anteElement.style.display = 'block';
    if (currentLevelIndex >= 2) {
        anteElement.innerText = `Ante: ${anteValue}`;
        anteElement.style.display = 'block';
        if (levelName === "BREAK") {
            chipElement.innerText = "BREAK";
            anteElement.style.display = 'none';
        }
    } else {
        anteElement.style.display = 'none';
    }

    // 현재 레벨 이름 표시
    levelElement.innerText = `${levelName}`;

    // 다음 레벨 정보 표시
    if (currentLevelIndex < clockList.length - 1) {
        const nextLevelInfo = clockList[currentLevelIndex + 1];
        const nextLevelName = Object.keys(nextLevelInfo)[0];
        const nextLevelValues = nextLevelInfo[nextLevelName];
        const nextLevelChip = `${nextLevelValues[0]} / ${nextLevelValues[1]}`;
        if (nextLevelName === 'BREAK') {
            document.querySelector('.nextLevel').innerText = `Next Level: BREAK`;
        } else {
            document.querySelector('.nextLevel').innerText = `Next Level: ${nextLevelChip}`;
        }
    } else {
        document.querySelector('.nextLevel').innerText = ''; // 마지막 레벨일 경우 다음 레벨 정보를 비웁니다.
    }

    minutes = clockInput.value;
    seconds = 0;
    clearTimeout(timer); // 이전 타이머 중지
    updateClock();
}


function updateClock() {
    if (minutes >= 0 && seconds >= 0) {
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
        clockElement.innerText = `${displayMinutes}:${displaySeconds}`;

        seconds--;

        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }

        timer = setTimeout(updateClock, 1000);
    } else {
        if (currentLevelIndex < clockList.length - 1) {
            nextButton.click();
        } 
    }
}

let isTimerStopped = false; // 타이머가 멈춰있는지 여부를 추적하는 변수

// timestop div를 클릭했을 때 호출되는 함수
document.querySelector('.timestop').addEventListener('click', toggleTimer);

// 타이머를 멈추거나 재생하는 함수
function toggleTimer() {
    if (isTimerStopped) {
        // 타이머가 멈춰있는 상태에서 클릭하면 재생
        isTimerStopped = false;
        updateClock(); // 타이머 재개
        document.querySelector('.timestop').innerText = 'STOP'; // 버튼 텍스트 변경
    } else {
        // 타이머가 동작중인 상태에서 클릭하면 멈춤
        isTimerStopped = true;
        clearTimeout(timer); // 타이머 중지
        document.querySelector('.timestop').innerText = 'PLAY'; // 버튼 텍스트 변경
    }
}

// MP3 재생 함수
function playSound() {
    const audio = document.getElementById('audio');
    audio.play();
}


// 타이머를 표시할 HTML 요소 가져오기
const timerDisplay = document.querySelector('.totaltimer');

// 시작 시간 설정
let startTime = new Date().getTime();

// 타이머 업데이트 함수
function updateTotalTimer() {
    // 현재 시간 가져오기
    let currentTime = new Date().getTime();

    // 경과 시간 계산 (밀리초 단위)
    let elapsedTime = currentTime - startTime;

    // 밀리초를 시, 분, 초로 변환
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);

    // 시간을 두 자리 숫자로 표시하기 위해 패딩 추가
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // 타이머 표시 업데이트
    timerDisplay.innerHTML = 'Total : ' + hours + ':' + minutes + ':' + seconds;
}

// 1초마다 타이머 업데이트
setInterval(updateTotalTimer, 1000);
