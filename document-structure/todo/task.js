const PRELOAD_ANIMATION_OPTIONS = {
    duration: 1800,
    easing: 'cubic-bezier(.72,.01,.75,.26)',
};
const REMOVE_TASK_ANIMATION = [
    { backgroundColor: 'rgba(44, 163, 20, 0.7)' },
    {
        transform: 'translate(-100%)',
        opacity: 0.5,
        backgroundColor: 'rgb(38, 38, 38)',
    },
];

// D O M

const input = document.querySelector('.tasks__input');
const tasksList = document.querySelector('.tasks__list');
const addBtn = document.querySelector('.tasks__add');
const preloadContainer = document.querySelector('.preloader');

// E V E N T    L I S T E N E R S

window.addEventListener('load', () => {
    startPreload();
    checkStorage();
});

addBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (input.value) {
        renderTask(input.value);
        addToStorage(input.value);
        input.value = '';
    }
});

// L O C A L    S T O R A G E

function checkStorage() {
    if (localStorage.tasks) {
        const tasks = JSON.parse(localStorage.tasks);
        tasks.forEach((task) => {
            renderTask(task);
        });
    }
}

function addToStorage(text) {
    if (
        !localStorage.tasks ||
        !(JSON.parse(localStorage.tasks) instanceof Array)
    ) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
    const currentStorage = JSON.parse(localStorage.getItem('tasks'));
    currentStorage.push(text);
    localStorage.tasks = JSON.stringify(currentStorage);
}

function removeFromStorage(text) {
    let currentStorage = JSON.parse(localStorage.getItem('tasks'));
    currentStorage = currentStorage.filter((task) => task != text);
    localStorage.tasks = JSON.stringify(currentStorage);
}

// T A S K    O P E R A T I O N S

function renderTask(text) {
    const taskContainer = document
        .querySelector('#task')
        .content.cloneNode(true);
    const taskText = taskContainer.querySelector('.task__title');
    const closeBtn = taskContainer.querySelector('.task__remove');
    closeBtn.addEventListener('click', removeTask);
    taskText.innerHTML = text;
    tasksList.appendChild(taskContainer);
}

function removeTask(evt) {
    evt.target.parentElement.animate(REMOVE_TASK_ANIMATION, 300);
    setTimeout(() => {
        evt.target.parentElement.remove();
    }, 300);
    removeFromStorage(
        evt.target.parentElement.querySelector('.task__title').textContent
    );
}

// A N I M A T I O N

function startPreload() {
    const logo = document.querySelector('svg');
    const originalLogo = document.querySelector('.logo__link');
    const logoPos = logo.getBoundingClientRect();
    const preloadLogoPos = originalLogo.getBoundingClientRect();
    originalLogo.style.visibility = 'hidden';
    logo.animate(
        [
            { transform: 'none', offset: 0.3 },
            {
                transform: `translate(-${
                    logoPos.left -
                    preloadLogoPos.left +
                    logoPos.width / 2 -
                    preloadLogoPos.width / 2
                }px, -${
                    logoPos.top -
                    preloadLogoPos.top +
                    logoPos.height / 2 -
                    preloadLogoPos.height / 2
                }px) scale(${preloadLogoPos.width / logoPos.width})`,
            },
        ],
        PRELOAD_ANIMATION_OPTIONS
    );
    preloadContainer.animate(
        { backgroundColor: 'rgba(0, 0, 0, 0)'},
        PRELOAD_ANIMATION_OPTIONS
    );

    setTimeout(() => {
        logo.remove();
        preloadContainer.remove();
        originalLogo.style.visibility = 'visible';
    }, PRELOAD_ANIMATION_OPTIONS.duration);
}
