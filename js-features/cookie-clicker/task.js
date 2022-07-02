const cookieImg = document.querySelector('#cookie');
const counter = document.querySelector('#clicker__counter');
const clickerWrapper = document.querySelector('.clicker__status');
clickerWrapper.insertAdjacentHTML('beforeend', 'Скорость: <span id="clicker__speed">0</span> кл/сек');
const speedElement = clickerWrapper.querySelector('#clicker__speed')
let lastClickTime = 0;

function onCookieClick() {
    counter.textContent++;
    toggleCookieSize();
    renderSpeed();
}
function toggleCookieSize() {
    if (cookieImg.width == 200) {
        cookieImg.width = 220;
        cookieImg.height *= 1.1;
    } else {
        cookieImg.width = 200;
        cookieImg.height /= 1.1;
    }
}
function measureSpeed() {
    const timeNow = (new Date()).getTime();
    const timeBetweenClicks = (timeNow - lastClickTime) / 1000; // in seconds

    lastClickTime = timeNow;
    return (1 / timeBetweenClicks).toFixed(2);
}
function renderSpeed() {
    const speed = measureSpeed();
    speedElement.textContent = speed;
}

cookieImg.addEventListener('click', onCookieClick);

