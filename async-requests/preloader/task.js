const loaderAnimation = document.querySelector('#loader');
const currencyContainer = document.querySelector('#items');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/');
xhr.send();
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState != 4) {
        return;
    }
    loaderAnimation.classList.remove('loader_active');
    const currencies = JSON.parse(xhr.responseText).response.Valute;
    for (key in currencies) {
        renderCurrency(currencies[key].CharCode, currencies[key].Value)
    }
});
function renderCurrency(name, value) {
    currencyContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="item">
            <div class="item__code">
                ${name}
            </div>
            <div class="item__value">
                ${value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>`
    );
}
