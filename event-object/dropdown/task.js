const valueFields = document.querySelectorAll('.dropdown__value');

function emitTextChange(valueField, optionsList) {
    [...optionsList.children].forEach((option) => {
        option.addEventListener('click', (evt) => {
            evt.preventDefault();
            valueField.textContent = option.textContent;
            optionsList.classList.remove('dropdown__list_active');
        })
    })
}

valueFields.forEach((field) => {
    const valuesList = field.nextElementSibling;
    field.addEventListener('click', () => {
        valuesList.classList.toggle('dropdown__list_active');
        emitTextChange(field, valuesList);
    })
})


//  все так сложно из за условия "Предусмотрите случай, когда на странице может одновременно находиться несколько таких кнопок"