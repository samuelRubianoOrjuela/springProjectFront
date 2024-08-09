import {
    register
} from './registerPeticiones.js'

const boton = document.querySelector('.submit-register');
const link = document.querySelector('.login-link');
boton.addEventListener('click', (e) => {
    e.preventDefault();
    const newDict = {
        "username": document.querySelector('#register-username').value,
        "password": document.querySelector('#register-password').value,
        "enable": true
    };    

    register(newDict).then(valid => {        
        if (valid.access && !sidebar.classList.contains('active')) {
            document.getElementById('register-section').classList.remove('active');
            document.getElementById('login-section').classList.toggle('active');
        } 
    })    
});

link.addEventListener('click', (e) => {
    document.getElementById('register-section').classList.remove('active');
    document.getElementById('login-section').classList.toggle('active');
})