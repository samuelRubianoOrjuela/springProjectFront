import {
    agregarEpleado,
    editarEmpleado,
    borrarEmpleado,
    getPuestos,
    getPuestoById,
    getEmpleados,
    getEmpleadoById
} from './empleadoPeticiones.js'
import{
    getOficinas,
    getOficinaById
} from '../oficina/oficinaPeticiones.js'

const removeElements = () => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.remove();
    });
}

const createBorrarForm = () => {
    removeElements();
    const ventanaBorrar = document.getElementById('ventana-borrar')
    ventanaBorrar.innerHTML = `
        <div class="container" id="container-borrar">
            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Introduce la información de búsqueda...">
                <button id="search-button">
                    <i class="bx bx-search"></i>
                </button>
            </div>
            <div class="search-results"></div>
        </div>
    `;
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        const infoContainers = document.querySelectorAll('.info-container');
        infoContainers.forEach(container => {
            const containerText = container.textContent.toLowerCase();
            if (containerText.includes(searchValue)) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    });
    getEmpleados().then(empleados => {
        empleados.forEach(e => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${e.idEmpleado} - ${e.nombre} - ${e.apellido1}`;
            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('bx', 'bx-trash');
            result.append(deleteBtn); 
            document.querySelector('.search-results').append(result);
            deleteBtn.addEventListener('click', () => {
                if (confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
                    borrarEmpleado(e.idEmpleado);
                }
            });
        })
    })
}

const createEditarForm = () => {
    removeElements();
    const ventanaEditar = document.getElementById('ventana-editar')
    ventanaEditar.innerHTML = `
        <div class="container" id="container-editar">
            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Introduce la información de búsqueda...">
                <button id="search-button">
                    <i class="bx bx-search"></i>
                </button>
            </div>
            <div class="search-results"></div>
        </div>
    `;
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        const infoContainers = document.querySelectorAll('.info-container');
        infoContainers.forEach(container => {
            const containerText = container.textContent.toLowerCase();
            if (containerText.includes(searchValue)) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    });
    getEmpleados().then(empleados => {
        empleados.forEach(e => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${e.idEmpleado} - ${e.nombre} - ${e.apellido1}`;
            const editBtn = document.createElement('i');
            editBtn.classList.add('bx', 'bx-edit');
            result.append(editBtn); 
            document.querySelector('.search-results').append(result);
            editBtn.addEventListener('click', () => {
                createEditDialog(e);
            });
        })
    })
}

const createBuscarForm = () => {
    removeElements();
    const ventanaBuscar = document.getElementById('ventana-buscar')
    ventanaBuscar.innerHTML = `
        <div class="container" id="container-buscar">
            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Introduce la información de búsqueda...">
                <button id="search-button">
                    <i class="bx bx-search"></i>
                </button>
            </div>
            <div class="search-results"></div>
        </div>
    `;
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        const infoContainers = document.querySelectorAll('.info-container');
        infoContainers.forEach(container => {
            const containerText = container.textContent.toLowerCase();
            if (containerText.includes(searchValue)) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    });
    getEmpleados().then(empleados => {
        empleados.forEach(e => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${e.idEmpleado} - ${e.nombre} - ${e.apellido1}`;
            const searchBtn = document.createElement('i');
            searchBtn.classList.add('bx', 'bx-info-circle');
            result.append(searchBtn); 
            document.querySelector('.search-results').append(result);
            searchBtn.addEventListener('click', () => {
                createSearchDialog(e);
            });
        })
    })
}

const createAgregarForm = () => {
    removeElements();
    const ventanaAgregar = document.getElementById('ventana-agregar');
    ventanaAgregar.innerHTML = `
        <div class="container">
            <form>
                <div class="box">
                    <label for="input-nombre">Nombre: </label>
                    <input type="text" id="input-nombre">
                </div>
                <div class="box">
                    <label for="input-apellido1">Apellido 1: </label>
                    <input type="text" id="input-apellido1">
                </div>
                <div class="box">
                    <label for="input-apellido2">Apellido 2: </label>
                    <input type="text" id="input-apellido2">
                </div>
                <div class="box">
                    <label for="input-extension">Extension: </label>
                    <input type="text" id="input-extension">
                </div>
                <div class="box">
                    <label for="input-email">Email: </label>
                    <input type="email" id="input-email">
                </div>
                <div class="box">
                    <label for="select-oficina">Oficina: </label>
                    <select name="" id="select-oficina"></select>
                </div>
                <div class="box">
                    <label for="select-jefe">Jefe: </label>
                    <select name="" id="select-jefe"></select>
                </div>
                <div class="box">
                    <label for="select-puesto">Puesto: </label>
                    <select name="" id="select-puesto"></select>
                </div>
                <button class="submit-button">+</button>
            </form>
        </div>
    `;
    getOficinas().then(oficinas => {
        oficinas.forEach(o => {                    
            const option = document.createElement('option');
            option.value = o.idOficina;
            option.innerHTML = o.lineaDireccion1;
            document.getElementById('select-oficina').append(option);
        })
    })
    getEmpleados().then(empleados => {
        empleados.forEach(e => {                    
            const option = document.createElement('option');
            option.value =  e.idEmpleado;
            option.innerHTML = `${e.nombre} ${e.apellido1}`;
            document.getElementById('select-jefe').append(option);
        })
    })
    getPuestos().then(puestos => {
        puestos.forEach(p => {                    
            const option = document.createElement('option');
            option.value =  p.idPuesto;
            option.innerHTML = p.nombrePuesto;
            document.getElementById('select-puesto').append(option);
        })
    })

    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "nombre": document.querySelector('#input-nombre').value,
            "apellido1": document.querySelector('#input-apellido1').value,
            "apellido2": document.querySelector('#input-apellido2').value,
            "extension": document.querySelector('#input-extension').value,
            "email": document.querySelector('#input-email').value,
            "idOficina": document.querySelector('#select-oficina').value,
            "idJefe": document.querySelector('#select-jefe').value,
            "idPuesto": document.querySelector('#select-puesto').value
        };
        agregarEpleado(newDict);
    });
}

const createEditDialog = (empleado) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    dialog.innerHTML = `
        <h1>Editar Empleado</h1>
        <form>
            <div class="box">
                <label for="input-nombre">Nombre: </label>
                <input type="text" id="input-nombre">
            </div>
            <div class="box">
                <label for="input-apellido1">Apellido 1: </label>
                <input type="text" id="input-apellido1">
            </div>
            <div class="box">
                <label for="input-apellido2">Apellido 2: </label>
                <input type="text" id="input-apellido2">
            </div>
            <div class="box">
                <label for="input-extension">Extension: </label>
                <input type="text" id="input-extension">
            </div>
            <div class="box">
                <label for="input-email">Email: </label>
                <input type="email" id="input-email">
            </div>
            <div class="box">
                <label for="select-oficina">Oficina: </label>
                <select name="" id="select-oficina"></select>
            </div>
            <div class="box">
                <label for="select-jefe">Jefe: </label>
                <select name="" id="select-jefe"></select>
            </div>
            <div class="box">
                <label for="select-puesto">Puesto: </label>
                <select name="" id="select-puesto"></select>
            </div>
            <button class="submit-button">+</button>
        </form>
    `;
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    getOficinas().then(oficinas => {
        oficinas.forEach(o => {        
            const option = document.createElement('option');
            option.id = o.idOficina;
            option.value = o.idOficina;
            option.innerHTML = o.lineaDireccion1;
            if (empleado.idOficina === o.idOficina) {option.setAttribute('selected','')}
            document.getElementById('select-oficina').append(option);
        })
    })
    getEmpleados().then(jefes => {
        jefes.forEach(j => {  
            const option = document.createElement('option');
            option.id = j.idEmpleado;
            option.value = j.idEmpleado;
            option.innerHTML = `${j.nombre} ${j.apellido1}`;
            if (empleado.idJefe === j.idEmpleado) {option.setAttribute('selected','')}
            document.getElementById('select-jefe').append(option);
        })
    })
    getPuestos().then(puestos => {
        puestos.forEach(p => {        
            const option = document.createElement('option');
            option.id = p.idPuesto;
            option.value = p.idPuesto;
            option.innerHTML = p.nombrePuesto;
            if (empleado.idPuesto === p.idPuesto) {option.setAttribute('selected','')}
            document.getElementById('select-puesto').append(option);
        })
    })
    getEmpleadoById(empleado.idEmpleado).then(empleado => {
        document.getElementById('input-nombre').value = empleado.nombre;
        document.getElementById('input-apellido1').value = empleado.apellido1;
        document.getElementById('input-apellido2').value = empleado.apellido2;
        document.getElementById('input-extension').value = empleado.extension;
        document.getElementById('input-email').value = empleado.email;
    });
    dialog.append(closeBtn);
    document.body.append(dialog);
    dialog.showModal();    

    document.querySelector(".submit-button").addEventListener('click', (ev) => {
        ev.preventDefault();
        const newDict = {
            "nombre": document.querySelector('#input-nombre').value,
            "apellido1": document.querySelector('#input-apellido1').value,
            "apellido2": document.querySelector('#input-apellido2').value,
            "extension": document.querySelector('#input-extension').value,
            "email": document.querySelector('#input-email').value,
            "idOficina": document.querySelector('#select-oficina').value,
            "idJefe": document.querySelector('#select-jefe').value,
            "idPuesto": document.querySelector('#select-puesto').value
        };
        editarEmpleado(empleado.idEmpleado, newDict);
    });
}

const createSearchDialog = (empleado) => {    
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    const title = document.createElement('h1');
    title.innerHTML = "Buscar Empleados";
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn, title);
    document.body.append(dialog);
    Object.values(empleado).forEach((item, i) => {
        if (i !== 0) {
            const text = document.createElement('div');
            text.classList.add('text-container',`text-container-${i}`);
            dialog.append(text);
        }
    })
    document.querySelector('.text-container-1').innerHTML = `<i class="bx bxs-circle"></i> Nombre: ${empleado.nombre}`;
    document.querySelector('.text-container-2').innerHTML = `<i class="bx bxs-circle"></i> Apellidos: ${empleado.apellido1} ${empleado.apellido2}`;
    document.querySelector('.text-container-3').innerHTML = `<i class="bx bxs-circle"></i> Extension: ${empleado.extension}`;
    document.querySelector('.text-container-4').innerHTML = `<i class="bx bxs-circle"></i> Email: ${empleado.email}`;
    getOficinaById(empleado.idOficina).then(oficina => {
        document.querySelector('.text-container-5').innerHTML = `<i class="bx bxs-circle"></i> Oficina: ${oficina.lineaDireccion1}`;
    })
    getEmpleadoById(empleado.idJefe).then(jefe => {
        document.querySelector('.text-container-6').innerHTML = `<i class="bx bxs-circle"></i> Jefe: ${jefe.nombre} ${jefe.apellido1}`;
    })
    getPuestoById(empleado.idPuesto).then(puesto => {
        document.querySelector('.text-container-7').innerHTML = `<i class="bx bxs-circle"></i> Puesto: ${puesto.nombrePuesto}`;
    })
    dialog.showModal();    
}

const opEmpleados = document.getElementById('opEmpleados');

opEmpleados.addEventListener('click', ()=>{
    createAgregarForm();
});

const eventosEmpleado = () => {
    document.getElementById('boton-agregar').addEventListener('click', () => {
        createAgregarForm();
    });
    document.getElementById('boton-editar').addEventListener('click', () => {
        createEditarForm();
    });
    document.getElementById('boton-buscar').addEventListener('click', () => {
        createBuscarForm();
    });
    document.getElementById('boton-borrar').addEventListener('click', () => {
        createBorrarForm();
    });
}
export {
    eventosEmpleado
}