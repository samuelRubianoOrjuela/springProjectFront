import {
    login
} from './loginPeticiones.js'

const boton = document.getElementById('submit-button');
const link = document.querySelector('.register-link');
let getHeader;
boton.addEventListener('click', (e) => {
    e.preventDefault();
    const newDict = {
        "username": document.querySelector('#input-username').value,
        "password": document.querySelector('#input-password').value
    };        
    login(newDict).then(valid => {
        if (valid.access && !sidebar.classList.contains('active')) {
            document.getElementById('login-section').classList.remove('active');
            document.getElementById('app').classList.toggle('active');
            getHeader = () => {
                return new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${valid.data.token}`
                });
            }
        } 
    })    
});
link.addEventListener('click', (e) => {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('register-section').classList.toggle('active');
})

export { getHeader }