const text = document.querySelector('#book');
const sizeButtons = document.querySelector('.book__control_font-size').children;
const colorButtons = document.querySelector('.book__control_color').children;
const bgButtons = document.querySelector('.book__control_background').children;

// решения для трех настроек идентичны, меняются только классы и свойства

[...sizeButtons].forEach((button) => {
    button.addEventListener('click', (evt) => {
        evt.preventDefault();

        text.classList.forEach((currentClass) => {                             // если есть класс, отвечающий за эту настройку...
            if (currentClass.startsWith('book_fs-')) {                         // убираем его
                text.classList.remove(currentClass); 
            }
        });
        if (button.dataset.size) {
            text.classList.add(`book_fs-${button.dataset.size}`);              // и добавляем нужный
        }

        if (document.querySelector('.font-size_active') != evt.target) {       // если нажата неактивная кнопка
            document
                .querySelector('.font-size_active')                            // по-хорошему это должно быть реализовано через радиокнопки
                .classList.remove('font-size_active');
        }
        button.classList.add('font-size_active');
    });
});

[...colorButtons].forEach((button) => {
    button.addEventListener('click', (evt) => {
        evt.preventDefault();

        text.classList.forEach((currentClass) => {
            if (currentClass.startsWith('book_color-')) {
                text.classList.remove(currentClass);
            }
        });
        if (button.dataset.textColor) {
            text.classList.add(`book_color-${button.dataset.textColor}`);
        }
        if (document.querySelector('.color_active') != evt.target) {
            document
                .querySelector('.color_active')
                .classList.remove('color_active');
        }
        button.classList.add('color_active');
    });
});

[...bgButtons].forEach((button) => {
    button.addEventListener('click', (evt) => {
        evt.preventDefault();

        text.classList.forEach((currentClass) => {
            if (currentClass.startsWith('book_bg-')) {
                text.classList.remove(currentClass);
            }
        });
        if (button.dataset.bgColor) {
            text.classList.add(`book_bg-${button.dataset.bgColor}`);
        }
        if (document.querySelector('.color_active') != evt.target) {
            document
                .querySelector('.color_active')
                .classList.remove('color_active');
        }
        button.classList.add('color_active');
    });
});
