const pollContainer = document.querySelector('.poll');

(function getData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
    xhr.send();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState != 4) {
            return;
        }
        renderPoll(JSON.parse(xhr.responseText));
    });
})();

function sendData({ id, answer }) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(`vote=${id}&answer=${answer}`);

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState != 4) {
            return;
        }
        renderStats(JSON.parse(xhr.responseText));
    });
}

function renderPoll(infoObject) {
    pollContainer.innerHTML =
    `<div class="poll__title" id="poll__title">${infoObject.data.title}</div>
    <div class="poll__answers poll__answers_active" id="poll__answers"></div>`;

    infoObject.data.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('poll__answer');
        button.textContent = answer;
        pollContainer.appendChild(button);
        
        button.addEventListener('click', () => {
            pollContainer.innerHTML = '';
            alert('Спасибо, ваш голос засчитан!');
            sendData({ id: infoObject.id, answer: index });
        });
    });
}

function renderStats(infoObject) {
    const totalVotes = infoObject.stat.reduce(
        (total, current) => total + current.votes,
        0
    );
    infoObject.stat.forEach((answerStat) => {
        pollContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="poll__result">
                <div class="result__progress" style="
                background-color: hsl(${Math.floor(Math.random() * 360)}, 100%, 50%, 0.3);
                right: ${100 - (answerStat.votes / totalVotes) * 100}%;">
                </div>
                <span class="result__name">${answerStat.answer}</span>
                <span class="result__count">${answerStat.votes}</span>
            </div>`
        );
    });
}
