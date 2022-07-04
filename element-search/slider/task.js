const sliderNext = document.querySelector('.slider__arrow_next');
const sliderBack = document.querySelector('.slider__arrow_prev');
const images = document.querySelector('.slider__items');
const dots = document.querySelectorAll('.slider__dot');
let prevDot;
let currentImg = images.querySelector('.slider__item_active');

//  T O O L S

function initDotChange(nextDot) {
    if (dots[prevDot]) {
        dots[prevDot].classList.remove('slider__dot_active');
    }
    dots[nextDot].classList.add('slider__dot_active');
    prevDot = nextDot;
}
function changeImages(nextImg) {
    currentImg.classList.remove('slider__item_active');
    nextImg.classList.add('slider__item_active');

    initDotChange([...images.children].indexOf(nextImg));
    currentImg = nextImg;
}

//       L I S T E N E R S

function onForwardClick() {
    if (currentImg.nextElementSibling) {
        changeImages(currentImg.nextElementSibling);
    } else {
        changeImages(images.firstElementChild);
    }
}
function onBackClick() {
    if (currentImg.previousElementSibling) {
        changeImages(currentImg.previousElementSibling);
    } else {
        changeImages(images.lastElementChild);
    }
}
function onWindowLoad() {
    initDotChange(0);
    window.removeEventListener('load', onWindowLoad);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        initDotChange(index == dots.length ? 0 : index);
        changeImages([...images.children][index]);
    });
});

sliderNext.addEventListener('click', onForwardClick);
sliderBack.addEventListener('click', onBackClick);
window.addEventListener('load', onWindowLoad);
