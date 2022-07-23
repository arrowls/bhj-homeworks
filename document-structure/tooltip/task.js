const hasTooltip = document.querySelectorAll('.has-tooltip');
let activeTooltip;

function openTooltip(evt) {
    evt.preventDefault();
    activeTooltip && activeTooltip.remove();
    const originPosition = evt.target.getBoundingClientRect();

    evt.target.insertAdjacentHTML(
        'afterbegin',
        `<div class="tooltip tooltip_active" 
            style="left: ${originPosition.left}px;
            top: ${originPosition.top + originPosition.height}px">
            ${evt.target.title}
        </div>`
    );
    activeTooltip = document.querySelector('.tooltip');
}
hasTooltip.forEach((element) => {
    element.addEventListener('click', openTooltip);
});
