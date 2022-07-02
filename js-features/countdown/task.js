// T O O L S

function getRandomTime() {
    const time = {};
    if (Math.random() > 0.5) {
        time.hours = Math.trunc(Math.random() * 24);
    }
    if (Math.random() > 0.5) {
        time.minutes = Math.trunc(Math.random() * 60);
    }
    time.seconds = Math.trunc(Math.random() * 60);
    return time;
}
function checkTime(hours, minutes, seconds) {
    return hours == 0 && minutes == 0 && seconds == 0;
}
function renderFullTime(hours, minutes, seconds) {
    return `${hours > 9 ? hours : '0' + hours}:${
        minutes > 9 ? minutes : '0' + minutes
    }:${seconds > 9 ? seconds : '0' + seconds}`;
}
function resetTimers() {
    clearInterval(easyTaskInterval);
    clearInterval(mediumTaskInterval);
}

// T A S K S

const timer = document.querySelector('#timer');
let easyTaskInterval;
let mediumTaskInterval;

function setEasyTimer() {
    let count = 59;
    document.querySelector('#status').firstChild.textContent =
        'До окончания конкурса осталось секунд: ';
    easyTaskInterval = setInterval(() => {
        timer.textContent = count;
        count--;
        if (count == 0) {
            alert('Вы победили в конкурсе!');
            clearInterval(easyTaskInterval);
        }
    }, 1000);
}
setEasyTimer();

function setMediumTimer(cb = (f) => f) {
    document.querySelector('#status').firstChild.textContent =
        'До окончания конкурса осталось: ';
    let { hours = 0, minutes = 0, seconds } = getRandomTime();

    mediumTaskInterval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours > 0 && hours--;
            }
        }
        if (checkTime(hours, minutes, seconds)) {
            alert('Вы победили в конкурсе!');
            cb();
            clearInterval(mediumTaskInterval);
        }
        timer.textContent = renderFullTime(hours, minutes, seconds);
    }, 1000);
}
function setHardTimer() {
    setMediumTimer(() => {
        document.location.assign(
            'https://ir.stonybrook.edu/xmlui/bitstream/handle/11401/9656/rickroll.mp4?sequence=1'
        );
    });
}

let difficultySelect =
    '<h2>Сложность таймера</h2><form><label style="display:block"><span>Легко</span><input type="radio" value="easy" name="difficulty"></label><label style="display:block"><span>Cложно</span><input type="radio" value="medium" name="difficulty"></label><label style="display:block;"><span>Сложно++</span><input type="radio" name="difficulty" value="hard"></label></form>';

document.body
    .querySelector('main')
    .insertAdjacentHTML('beforeend', difficultySelect);

document.querySelector('form').addEventListener('change', () => {
    resetTimers();
    switch (document.querySelector('input:checked').value) {
        case 'easy':
            setEasyTimer();
            break;
        case 'medium':
            setMediumTimer();
            break;
        case 'hard':
            setHardTimer();
            break;
    }
});
