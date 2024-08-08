import {
    login
} from './loginPeticiones.js'

const boton = document.getElementById('submit-button');
let getHeader;
boton.addEventListener('click', (e) => {
    e.preventDefault();
    const newDict = {
        "username": document.querySelector('#input-email').value,
        "password": document.querySelector('#input-password').value
    };        
    login(newDict).then(valid => {
        if (valid.access && !sidebar.classList.contains('active')) {
            document.getElementById('login').classList.remove('active');
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


export { getHeader }