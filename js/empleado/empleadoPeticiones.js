const URL_API = "http://localhost:8080/";
const endpoint = "empleado";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const agregarEpleado = (newDict) => {
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

const editarEmpleado = (id, newDict) => {
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

const borrarEmpleado = async (id) => {

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

const getEmpleados = async () =>{
    try {
        const response = await fetch(URL_API + endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const empleados = await response.json();
        if (!Array.isArray(empleados)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return empleados; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getEmpleadoById = async (id) => {
    try {
        const response = await fetch(URL_API + endpoint + `/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        if (response.status === 204 || response.headers.get('Content-Length') === '0') {
            return null;
        }
        const empleado = await response.json();
        return empleado; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
    
}

const getPuestos = async () =>{
    try {
        const response = await fetch(URL_API + 'puesto');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const puestos = await response.json();
        if (!Array.isArray(puestos)) {
            throw new Error('La respuesta no es un arreglo');
        }
        return puestos; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

const getPuestoById = async (id) => {
    try {
        const response = await fetch(URL_API + `puesto/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const puesto = await response.json();
        return puesto; 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

}

export {
    agregarEpleado,
    editarEmpleado,
    borrarEmpleado,
    getPuestos,
    getPuestoById,
    getEmpleados,
    getEmpleadoById
}