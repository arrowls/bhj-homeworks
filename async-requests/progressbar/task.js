const form = document.querySelector('#form');
const progressInput = document.querySelector('#progress');
form.addEventListener('submit', evt => {
    evt.preventDefault()
    const formData = new FormData(form)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    
    xhr.upload.onprogress = evt => {
        progressInput.value = evt.loaded / evt.total; 
    }
    xhr.send( formData )
})
