const menus = document.querySelectorAll('.menu_main > li');
const menusToOpen = [...menus].filter((menu) => menu.querySelector('ul'));  // выбираем меню с выпадающим списком
let openedMenu;

menusToOpen.forEach((menu) => {
    menu.addEventListener('click', (evt) => {
        evt.preventDefault();                                               // отменяем переход по ссылке 
        menu.querySelector('ul').classList.toggle('menu_active');
        if (openedMenu && openedMenu != evt.target) {                       // если клик был не по открытому меню -
            openedMenu.querySelector('ul').classList.remove('menu_active'); // ...скрываем его
        }
        openedMenu = menu;                                                  // ... и записываем в переменную последний клик
    });
});                                                                         // код так же работает и для нескольких меню

// спасибо за вашу работу! положительные отзывы серьезно мотивируют учиться)