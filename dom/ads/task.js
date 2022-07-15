const rotatorCases = document.querySelector('.rotator');

(function cahngeMessage() {
    let activeMessage = rotatorCases.querySelector('.rotator__case_active');
    let rotationSpeed = 1000; // ms
    activeMessage.classList.remove('rotator__case_active');
    activeMessage = getNextElement(activeMessage);
    activeMessage.classList.add('rotator__case_active');

    if (activeMessage.dataset.color) {
        activeMessage.style.color = activeMessage.dataset.color;
    }
    if (activeMessage.dataset.speed) {
        rotationSpeed = activeMessage.dataset.speed;
    }
    setTimeout(cahngeMessage, rotationSpeed) // ммм, рекурсия
})()
function getNextElement(currentElement) {
    return currentElement.nextElementSibling ? currentElement.nextElementSibling : rotatorCases.firstElementChild;
}