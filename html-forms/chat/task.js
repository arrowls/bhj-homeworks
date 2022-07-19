const botMessages = [
    // хотелось бы такие данные выносить в отдельный файл, но увы(
    'Добрый день, мы ещё не проснулись. Позвоните через 10 лет',
    'Где ваша совесть?',
    'Добрый день. До свидания.',
    'Все операторы заняты. Извиняйте',
    'A?',
    'Еще ничего не купил, а так разговариваешь',
    'Без понятия о чем вы',
    'Сейчас посмотрим... *закрыл ноутбук*',
];

// C O N F I G

const BOT_RESPONCE_MAX_TIME = 1000; // ms
const MS_TO_WAIT = 10000; // 30 sec

// D O M  T H I N G S

const chatWindow = document.querySelector('.chat-widget');
const chatButton = chatWindow.querySelector('.chat-widget__side');
const inputField = chatWindow.querySelector('.chat-widget__input');
const messageContainer = chatWindow.querySelector('.chat-widget__messages');

// U T I L S

function whatTimeIsIt() {
    return `${new Date().getHours()}:${new Date().getMinutes()}`;
}
function getRandomMessage() {
    return botMessages[Math.floor(Math.random() * botMessages.length)];
}
let botTimeout;

// A C T U A L   C O D E

chatButton.addEventListener('click', () => {                                   // при клике открываем чат
    chatWindow.classList.add('chat-widget_active');
    inputField.addEventListener('keydown', onMessageSend);                     // и вешаем обработчик на инпут
});

function onMessageSend(evt) {
    if (evt.key != 'Enter' || !inputField.value) {                             // сразу же отсеиваем ненужные нажатия
        return;
    }

    messageContainer.innerHTML += `<div class="message message_client">
        <div class="message__time">${whatTimeIsIt()}</div>
        <div class="message__text">${inputField.value}</div></div>`;
    inputField.value = '';
    messageContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    setTimeout(setBotAnswer, Math.random() * BOT_RESPONCE_MAX_TIME);           // через рандомное время (в примере до 1 секунды, настраивается выше) бот отвечает
}                                                                     

function setBotAnswer() {
    clearTimeout(botTimeout);
    messageContainer.innerHTML += `<div class="message ">
        <div class="message__time">${whatTimeIsIt()}</div>
        <div class="message__text">${getRandomMessage()}</div></div>`;
    messageContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });

    botTimeout = setTimeout(() => {
        messageContainer.innerHTML += `<div class="message ">
            <div class="message__time">${whatTimeIsIt()}</div>
            <div class="message__text">Вы здесь? Я скучаю... Впрочем, одному даже лучше</div></div>`;
        messageContainer.lastElementChild.scrollIntoView({
            behavior: 'smooth',
        });
    }, MS_TO_WAIT);
}
