const holes = document.querySelectorAll('.hole');
const successCounter = document.querySelector('#dead');
const failCounter = document.querySelector('#lost');

holes.forEach((hole) => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('hole_has-mole')) {
            successCounter.textContent++;
        } else {
            failCounter.textContent++;
        }
        checkWin();
    })
})
function checkWin() {
    if (successCounter.textContent >= 10) {
        alert('Победа!');
        resetState();
    }
    if (failCounter.textContent >= 5) {
        alert('Поражение!');
        resetState();
    }
}
function resetState() {
    successCounter.textContent = 0;
    failCounter.textContent = 0;
}