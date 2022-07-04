const menus = document.querySelectorAll('.menu_main > li');
const menusToOpen = [...menus].filter((menu) => menu.querySelector('ul'));  
let openedMenu;

menusToOpen.forEach((menu) => {
    menu.addEventListener('click', (evt) => {
        if (evt.target == evt.currentTarget.firstElementChild) {
            evt.preventDefault();
        }                                           
        menu.querySelector('ul').classList.toggle('menu_active');
        if (openedMenu && openedMenu !== evt.target.parentNode) {                      
            openedMenu.querySelector('ul').classList.remove('menu_active'); 
        }
        openedMenu = menu;                                                  
    });
});                                                                         
