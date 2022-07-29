const inputArea = document.querySelector('textarea#editor');
const clearButton = document.querySelector('button.clear');

window.addEventListener('load', () => {
    inputArea.value = localStorage.text ? JSON.parse(localStorage.text) : '';
});
inputArea.addEventListener('change', () => {
    localStorage.text = JSON.stringify(inputArea.value);
});
clearButton.addEventListener('click', () => {
    inputArea.value = '';
    localStorage.text = '';
});
