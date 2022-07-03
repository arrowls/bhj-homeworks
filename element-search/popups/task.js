const popup = document.querySelector('#modal_main');
const successBtn = document.querySelector('.show-success');
const successPopup = document.querySelector('#modal_success');

window.addEventListener('load', onWindowLoad);                            // при загрузке страницы отображает попап
successBtn.addEventListener('click', onShowSuccessClick);

function onWindowLoad() {
    popup.classList.add('modal_active');
    window.removeEventListener('load', onWindowLoad);
    initCloseBtn(popup);
}
function onShowSuccessClick() {
    popup.classList.remove('modal_active');
    successPopup.classList.add('modal_active');
    successBtn.removeEventListener('click', onShowSuccessClick);
    initCloseBtn(successPopup);
}

function initCloseBtn(currentPopup) {
    currentPopup
        .querySelector('.modal__close')
        .addEventListener('click', () => {                                //Функция находит кнокпу в активном попапе
            currentPopup.classList.remove('modal_active');                // и вешает на нее обработчик
        });
}
