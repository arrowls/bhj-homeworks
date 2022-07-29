const popup = document.querySelector('.modal');
const popupRemoveBtn = popup.querySelector('.modal__close');
const oneMoreTimeBtn = document.querySelector('.one-more-time');

function checkCookie() {
    let cookies = document.cookie.split('; ');
    cookies = cookies.filter((element) => element.startsWith('modal-closed'));
    return cookies[0]?.split('=')[1] == 'true';
}

function deleteCookie() {
    document.cookie =
        'modal-closed=true; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
}

function onCloseBtnClick() {
    popup.classList.remove('modal_active');
    document.cookie = 'modal-closed=true';
    popupRemoveBtn.removeEventListener('click', onCloseBtnClick);
}

window.addEventListener('load', () => {
    if (!checkCookie()) {
        popup.classList.add('modal_active');
        popupRemoveBtn.addEventListener('click', onCloseBtnClick);
    }
});
oneMoreTimeBtn.addEventListener('click', deleteCookie); // для удобства проверки 
