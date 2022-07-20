const checkboxes = document.querySelectorAll('.interest__check');

// логика, конечно, невероятно сложная, думаю, можно сделать проще
// но, это все, что мне пришло в голову
// очень хочется услышать ваши комментарии по поводу этого кода
// особенно о том, как сделать его проще


checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (evt) => {
        evt.preventDefault();
        checkChildren(evt.target); // вешаем обработчик и проверяем вверх и вниз по вложенности
        checkParents(evt.target);
    });
});
function checkChildren(element) { 
    const childrenCheckboxes = element
        .closest('li')
        .querySelectorAll('input[type="checkbox"]');
    childrenCheckboxes.forEach((checkbox) => { // при нажатии все дочерние чекбоксы становятся такими же, 
        if (checkbox != element) {
            checkbox.checked = element.checked; // как и тот, на котором было нажатие
            checkbox.indeterminate = false;
        }
    });
}
function checkParents(element) {    // проверяет вверх по вложенности
    if (!getParents(element)[0]) {  // если это самый верхний чекбокс - нам тут делать нечего
        return;
    }
    const parentElements = getParents(element);     // если нет - получаем все чекбоксы выше и работаем дальше
    if (checkSiblings(element)) {                   // если все соседние чекбоксы нажаты так же
        parentElements[0].checked = element.checked;// родительский чекбокс, очевидно, будет иметь такое же значение
        parentElements[0].indeterminate = false;
        checkParents(parentElements[0]);            // так как не все ЧБ могут быть нажаты на следующем уровне - нужно их проверить
    } else {
        parentElements.forEach((element) => {       // если же соседние чекбоксы нажаты по-разному
            element.checked = true;                 // можно смело ставить всем родителям indeterminate
            element.indeterminate = true;
        });
    }
}
function checkSiblings(element) {                   // функция проверяет нажаты ли все чекбоксы так же, как и element
    const siblingContainers = [...element.closest('ul').children];
    const siblingCheckboxes = siblingContainers.map((li) =>
        li.querySelector('input[type="checkbox"]')
    );
    return siblingCheckboxes.every(
        (checkbox) => checkbox.checked == element.checked
    );
}
function getParents(element) {                      // передает все родительские ЧБ (не считая переданного)
    const parentCheckboxes = [];
    function check(element) {
        try {
            parentCheckboxes.push(
                element
                    .closest('ul')
                    .closest('li')
                    .querySelector('input[type="checkbox"]')
            );
            check(parentCheckboxes[parentCheckboxes.length - 1]);
        } catch {
            return;
        }
    }
    check(element);
    return parentCheckboxes;
}
