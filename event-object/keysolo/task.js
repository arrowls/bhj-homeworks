
// C O N F I G

const CHANGE_WORD_TIMING = 100;
const SECONDS_PER_LETTER = 1;
const WORDS_TO_WIN = 10;
const MISTAKES_TO_LOSE = 3;
const TIMER_FPS = 20;

// S E R V I C E

let currentLetterElement;
let interval;
const words = [
    'Bob',
    'Я люблю JS',
    'Нетология',
    'FrontEnd',
    'awesome',
    'netology',
    'hello',
    'kitty',
    'rock',
    'youtube',
    'popcorn',
    'cinema',
    'love',
    'javascript',
];

//  D O M    S T U F F

const wordContainer = document.querySelector('.word');
const timer = document.querySelector('.timer');
const background = document.querySelector('div.card');
const failCounter = document.querySelector('.status__loss');
const successCounter = document.querySelector('.status__wins');

// T O O L S

function clear() {
    wordContainer.innerHTML = '';
    window.removeEventListener('keyup', onKeyPress);
    clearInterval(interval);
    timer.style.width = '0%';
}
function showPopup(type) {
    document.querySelector(`.popup_${type}`).classList.add('popup-visible');
}
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
function getCurrentLetter() {
    return wordContainer.querySelector('.symbol_active').textContent;
}
function isModifierPressed(evt) {
    return (
        evt.key == 'Control' ||
        evt.key == 'Meta' ||
        evt.key == 'Alt' ||
        evt.key == 'Shift' ||
        evt.key == 'Backspace' ||
        evt.key == 'Tab' ||
        evt.key == 'Enter' ||
        evt.key == 'CapsLock'
    );
}

// L I S T E N E R S

function onKeyPress(evt) {
    if (isModifierPressed(evt)) {
        return;
    }
    if (evt.key == getCurrentLetter()) {
        currentLetterElement.classList.add('symbol_correct');
        nextLetter();
    } else {
        fail();
    }
}
function awaitSpaceInput(evt) {
    if (evt.key == ' ') {
        document
            .querySelector('.popup-visible')
            .classList.remove('popup-visible');
        renderWord();
        failCounter.textContent = 0;
        successCounter.textContent = 0;
        window.removeEventListener('keyup', awaitSpaceInput);
    }
}

// I N--G A M E    F U N C T I O N S

function renderWord() {
    clear();
    [...getRandomWord()].forEach((letter, index) => {
        wordContainer.insertAdjacentHTML(
            'beforeend',
            `<span class="symbol${
                index == 0 ? ' symbol_active' : ''
            }">${letter}</span>`
        );
        currentLetterElement = document.querySelector('.symbol_active');
    });
    initTimer(wordContainer.childElementCount);
    window.addEventListener('keyup', onKeyPress);
}
function nextLetter() {
    currentLetterElement.classList.remove('symbol_active');
    if (!currentLetterElement.nextElementSibling) {
        success();
        return;
    }
    currentLetterElement = currentLetterElement.nextElementSibling;
    currentLetterElement.classList.add('symbol_active');
    currentLetterElement.classList.add('game_test');
}
function initTimer(count) {
    clearInterval(interval);
    const seconds = count * SECONDS_PER_LETTER;
    let width = 100;
    interval = setInterval(() => {
        timer.style.width = `${width - 100 / (seconds / 0.05)}%`;
        timer.style.backgroundColor = `hsl(${width}, 100%, 50%)`;
        width -= 100 / (seconds / 0.05);
        if (width <= 0) {
            fail();
            clearInterval(interval);
        }
    }, 1000 / TIMER_FPS);
}

function fail() {
    failCounter.textContent++;
    if (failCounter.textContent == MISTAKES_TO_LOSE) {
        clear();
        showPopup('fail');
        window.addEventListener('keyup', awaitSpaceInput);
        return;
    }
    background.classList.add('word_incorrect');
    setTimeout(() => background.classList.remove('word_incorrect'), 200);
    setTimeout(() => renderWord(), CHANGE_WORD_TIMING);
}
function success() {
    successCounter.textContent++;
    if (successCounter.textContent == WORDS_TO_WIN) {
        clear();
        showPopup('success');
        window.addEventListener('keyup', awaitSpaceInput);
        return;
    }
    renderWord();
}

renderWord();
