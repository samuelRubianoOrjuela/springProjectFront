const URL_API = "http://localhost:8080/";
const endpoint = "oficina";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const agregarOficina = (newDict) => {
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
                headers: myHeaders,
                body: JSON.stringify(newDict),
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

const editarOficina = (id, newDict) => {
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
                headers: myHeaders,
                body: JSON.stringify(newDict),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("La informacion ha sido actualizada con exito 🥵");
            })
            .catch((error) => console.error('Error:', error));
    }
}

const borrarOficina = async (id) => {

    fetch(`${URL_API + endpoint}/eliminar/${id}`, {
        method: 'DELETE', 
        headers: myHeaders, 
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

const getOficinas = async () =>{
    try {
        const response = await fetch(URL_API + endpoint);
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

const getOficinaById = async (id) => {
    try {
        const response = await fetch(URL_API + endpoint + `/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const oficina = await response.json();
        return oficina; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

}

const getCiudades = async () =>{
    try {
        const response = await fetch(URL_API + 'ciudad');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const ciudades = await response.json();
        if (!Array.isArray(ciudades)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return ciudades; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getCiudadById = async (id) => {
    try {
        const response = await fetch(URL_API + `ciudad/${id}`);
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
    agregarOficina,
    editarOficina,
    borrarOficina,
    getCiudades,
    getCiudadById,
    getOficinas,
    getOficinaById
}