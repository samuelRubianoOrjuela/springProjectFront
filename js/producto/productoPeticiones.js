import {
    getHeader
} from '../login/loginStyles.js'
const URL_API = "http://localhost:8080/";
const endpoint = "producto";

const agregarProducto = (newDict) => {
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

const editarProducto = (id, newDict) => {
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

const borrarProducto = async (id) => {

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

const getProductos = async () =>{
    try {
        const response = await fetch(URL_API + endpoint, {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const oficinas = await response.json();
        if (!Array.isArray(oficinas)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return oficinas; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getProductoById = async (id) => {
    try {
        const response = await fetch(URL_API + endpoint + `/${id}`, {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const producto = await response.json();
        return producto; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

}

const getDimensiones = async () =>{
    try {
        const response = await fetch(URL_API + 'dimension', {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const dimensiones = await response.json();
        if (!Array.isArray(dimensiones)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return dimensiones; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getDimensionById = async (id) => {
    try {
        const response = await fetch(URL_API + `dimension/${id}`, {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const dimension = await response.json();
        return dimension; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

}

const getGamas = async () =>{
    try {
        const response = await fetch(URL_API + 'gama', {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const gamas = await response.json();
        if (!Array.isArray(gamas)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return gamas; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getGamaById = async (id) => {
    try {
        const response = await fetch(URL_API + `gama/${id}`, {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const gama = await response.json();
        return gama; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

}

const getProveedores = async () =>{
    try {
        const response = await fetch(URL_API + 'proveedor', {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const proveedores = await response.json();
        if (!Array.isArray(proveedores)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return proveedores; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getProveedorById = async (id) => {
    try {
        const response = await fetch(URL_API + `proveedor/${id}`, {
            method: 'GET', 
            headers: getHeader()
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const proveedor = await response.json();
        return proveedor; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

}


export {
    agregarProducto,
    editarProducto,
    borrarProducto,
    getProductos,
    getProductoById,
    getDimensiones,
    getDimensionById,
    getGamas,
    getGamaById,
    getProveedores,
    getProveedorById
}