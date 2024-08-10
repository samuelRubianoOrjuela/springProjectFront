import {
    getHeader
} from '../login/loginStyles.js'
const URL_API = "http://localhost:8080/";
const endpoint = "pedido";

const agregarPedido = (newDict) => {
    let correct;
    for (let i in newDict){
        if (newDict[i].length > 0){
            correct = true;
        } else{
            correct = false;
            alert('Debes llenar toda la información para continuar');
            break;
        }
    }
    if (correct){
        fetch(`${URL_API + endpoint}/nuevo`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(newDict)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("La informacion ha sido añadida con exito 🥵");
            }
            )
            .catch((error) => console.error('Error:', error));
    }
}
const editarPedido = (id, newDict) => {
    let correct;
    for (let i in newDict){
        if (newDict[i].length > 0){
            correct = true;
        } else{
            correct = false;
            alert('Debes llenar toda la información para continuar');
            break;
        }
    }
    if (correct){
        fetch(`${URL_API + endpoint}/actualizar/${id}`, {
                method: 'PUT',
                headers: getHeader(),
                body: JSON.stringify(newDict)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("La informacion ha sido actualizada con exito 🥵");
            })
            .catch((error) => console.error('Error:', error));
    }
}

const borrarPedido = async (id) => {

    fetch(`${URL_API + endpoint}/eliminar/${id}`, {
        method: 'DELETE', 
        headers: getHeader()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición DELETE');
        }
        if (response.status === 204) {
            alert("La información ha sido eliminada con éxito 🗑️");
            return null;
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const getPedidos = async () =>{ 
    try {        
        const response = await fetch(URL_API + endpoint, {
            method: 'GET',
            headers: getHeader()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const clientes = await response.json();
        if (!Array.isArray(clientes)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return clientes; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getPedidoById = async (id) => {
    try {
        const response = await fetch(URL_API + endpoint + `/${id}`, {
            method: 'GET',
            headers: getHeader()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const oficina = await response.json();
        return oficina; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getEstadosPedido = async () =>{
    try {
        const response = await fetch(URL_API + 'estado', {
            method: 'GET',
            headers: getHeader()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const estados = await response.json();
        if (!Array.isArray(estados)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return estados; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getEstadoPedidoById = async (id) => {
    try {
        const response = await fetch(URL_API + `ciudad/${id}`, {
            method: 'GET',
            headers: getHeader(),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const ciudad = await response.json();
        return ciudad; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

export {
    agregarPedido,
    editarPedido,
    borrarPedido,
    getEstadosPedido,
    getEstadoPedidoById,
    getPedidos,
    getPedidoById
}