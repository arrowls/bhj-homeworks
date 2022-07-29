const authForm = document.querySelector('#signin__form');
const loginBtn = document.querySelector('#signin__btn');
const authElement = document.querySelector('#signin');
const welcomeElement = document.querySelector('#welcome');
const exitBtn = document.querySelector('#exit');

localStorage.userid && openWelcome(localStorage.userid);

authForm.addEventListener('submit', checkUser);
exitBtn.addEventListener('click', onExitClick);

function checkUser(evt) {
    evt.preventDefault();

    const formData = new FormData(authForm);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            onServerResponse(JSON.parse(xhr.responseText));
        }
    });
    xhr.send(formData);
}

function openWelcome(id) {
    authElement.classList.remove('signin_active');
    welcomeElement.classList.add('welcome_active');
    welcomeElement.querySelector('#user_id').textContent = id;
}

function onServerResponse(response) {
    resetForm();
    if (!response.success) {
        alert('Неверный логин и/или пароль');
        return;
    }
    localStorage.userid = response['user_id'];
    openWelcome(response['user_id']);
}

function resetForm() {
    authForm.querySelectorAll('input').forEach(field => field.value = '');
}

function onExitClick() {
    localStorage.removeItem('userid');
    authElement.classList.add('signin_active');
    welcomeElement.classList.remove('welcome_active');
}
