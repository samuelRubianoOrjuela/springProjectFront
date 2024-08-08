import {
    agregarCliente,
    editarCliente,
    borrarCliente,
    getCiudades,
    getCiudadById,
    getDirecciones,
    getDireccionById,
    getClientes
} from './clientePeticiones.js'
import{
    getEmpleados,
    getEmpleadoById
} from '../empleado/empleadoPeticiones.js'

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
    getClientes().then(clientes => {
        clientes.forEach(c => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${c.nombreContacto} - ${c.nombreCliente} - ${c.apellidoCliente}`;
            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('bx', 'bx-trash');
            result.append(deleteBtn); 
            document.querySelector('.search-results').append(result);
            deleteBtn.addEventListener('click', () => {
                if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
                    borrarCliente(c.idCliente);
                }
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
    getClientes().then(clientes => {
        clientes.forEach(c => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${c.nombreContacto} - ${c.nombreCliente} - ${c.apellidoCliente}`;
            const searchBtn = document.createElement('i');
            searchBtn.classList.add('bx', 'bx-info-circle');
            result.append(searchBtn); 
            document.querySelector('.search-results').append(result);
            searchBtn.addEventListener('click', () => {
                createSearchDialog(c);
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
    getClientes().then(clientes => {
        clientes.forEach(c => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${c.nombreContacto} - ${c.nombreCliente} - ${c.apellidoCliente}`;
            const editBtn = document.createElement('i');
            editBtn.classList.add('bx', 'bx-edit');
            result.append(editBtn); 
            document.querySelector('.search-results').append(result);
            editBtn.addEventListener('click', () => {
                createEditDialog(c);
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
                    <label for="input-nombreContacto">Nombre del Contacto: </label>
                    <input type="text" id="input-nombreContacto">
                </div>
                <div class="box">
                    <label for="input-nombreCliente">Nombre del Cliente: </label>
                    <input type="text" id="input-nombreCliente">
                </div>
                <div class="box">
                    <label for="input-apellidoCliente">Apellido del Cliente: </label>
                    <input type="text" id="input-apellidoCliente">
                </div>
                <div class="box">
                    <label for="input-email">Email: </label>
                    <input type="email" id="input-email">
                </div>
                <div class="box">
                    <label for="input-fax">Fax: </label>
                    <input type="text" id="input-fax">
                </div>
                <div class="box">
                    <label for="input-telefono">Telefono: </label>
                    <input type="number" id="input-telefono">
                </div>
                <div class="box">
                    <label for="select-ciudad">Ciudad: </label>
                    <select name="" id="select-ciudad"></select>
                </div>
                <div class="box">
                    <label for="select-direccion">Direccion: </label>
                    <select name="" id="select-direccion"></select>
                </div>
                <div class="box">
                    <label for="select-empRepVentas">Representante de Ventas: </label>
                    <select name="" id="select-empRepVentas"></select>
                </div>
                <div class="box">
                    <label for="input-limiteCredito">Limite de Credito: </label>
                    <input type="number" id="input-limiteCredito">
                </div>
                <button class="submit-button">+</button>
            </form>
        </div>
    `;
    getCiudades().then(ciudades => {
        ciudades.forEach(c => {                    
            const option = document.createElement('option');
            option.value = c.idCiudad;
            option.innerHTML = c.nombreCiudad;
            document.getElementById('select-ciudad').append(option);
        })
    })
    getDirecciones().then(direcciones => {
        direcciones.forEach(d => {                    
            const option = document.createElement('option');
            option.value = d.idDireccion;
            option.innerHTML = d.direccion;
            document.getElementById('select-direccion').append(option);
        })
    })
    getEmpleados().then(empleados => {
        empleados.forEach(e => {                    
            const option = document.createElement('option');
            option.value = e.idEmpleado;
            option.innerHTML = `${e.nombre} ${e.apellido1}`;
            document.getElementById('select-empRepVentas').append(option);
        })
    })

    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "nombreContacto": document.querySelector('#input-nombreContacto').value,
            "nombreCliente": document.querySelector('#input-nombreCliente').value,
            "apellidoCliente": document.querySelector('#input-apellidoCliente').value,
            "email": document.querySelector('#input-email').value,
            "fax": document.querySelector('#input-fax').value,
            "telefono": document.querySelector('#input-telefono').value,
            "ciudadId": document.querySelector('#select-ciudad').value,
            "direccionId": document.querySelector('#select-direccion').value,
            "empleadoRepVentasId": document.querySelector('#select-empRepVentas').value,
            "limiteCredito": document.querySelector('#input-limiteCredito').value
        };        
        agregarCliente(newDict)
    });
}

const createEditDialog = (cliente) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    dialog.innerHTML = `
        <h1>Editar Oficina</h1>
        <form>
            <div class="box">
                <label for="input-nombreContacto">Nombre del Contacto: </label>
                <input type="text" id="input-nombreContacto">
            </div>
            <div class="box">
                <label for="input-nombreCliente">Nombre del Cliente: </label>
                <input type="text" id="input-nombreCliente">
            </div>
            <div class="box">
                <label for="input-apellidoCliente">Apellido del Cliente: </label>
                <input type="text" id="input-apellidoCliente">
            </div>
            <div class="box">
                <label for="input-email">Email: </label>
                <input type="email" id="input-email">
            </div>
            <div class="box">
                <label for="input-fax">Fax: </label>
                <input type="text" id="input-fax">
            </div>
            <div class="box">
                <label for="input-telefono">Telefono: </label>
                <input type="number" id="input-telefono">
            </div>
            <div class="box">
                <label for="select-ciudad">Ciudad: </label>
                <select name="" id="select-ciudad"></select>
            </div>
            <div class="box">
                <label for="select-direccion">Direccion: </label>
                <select name="" id="select-direccion"></select>
            </div>
            <div class="box">
                <label for="select-empRepVentas">Representante de Ventas: </label>
                <select name="" id="select-empRepVentas"></select>
            </div>
            <div class="box">
                <label for="input-limiteCredito">Limite de Credito: </label>
                <input type="number" id="input-limiteCredito">
            </div>
            <button class="submit-button">+</button>
        </form>
    `;
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn);
    document.body.append(dialog);
    getCiudades().then(ciudades => {
        ciudades.forEach(c => {        
            const option = document.createElement('option');
            option.id = c.idCiudad;
            option.value = c.idCiudad;
            option.innerHTML = c.nombreCiudad;
            if (cliente.ciudadId === c.idCiudad) {option.setAttribute('selected','')}
            document.getElementById('select-ciudad').append(option);
        })
    })
    getDirecciones().then(direcciones => {
        direcciones.forEach(d => {        
            const option = document.createElement('option');
            option.id = d.idDireccion;
            option.value = d.idDireccion;
            option.innerHTML = d.direccion;
            if (cliente.direccionId === d.idDireccion) {option.setAttribute('selected','')}
            document.getElementById('select-direccion').append(option);
        })
    })
    getEmpleados().then(empRepVentas => {
        empRepVentas.forEach(e => {        
            const option = document.createElement('option');
            option.id = e.idEmpleado;
            option.value = e.idEmpleado;
            option.innerHTML = `${e.nombre} ${e.apellido1}`;
            if (cliente.empleadoRepVentasId === e.idEmpleado) {option.setAttribute('selected','')}
            document.getElementById('select-empRepVentas').append(option);
        })
    })
    document.querySelector('#input-nombreContacto').value = cliente.nombreContacto;
    document.querySelector('#input-nombreCliente').value = cliente.nombreCliente;
    document.querySelector('#input-apellidoCliente').value = cliente.apellidoCliente;
    document.querySelector('#input-email').value = cliente.email;
    document.querySelector('#input-fax').value = cliente.fax;
    document.querySelector('#input-telefono').value = cliente.telefono;
    document.querySelector('#input-limiteCredito').value = cliente.limiteCredito;
    dialog.showModal();    

    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "nombreContacto": document.querySelector('#input-nombreContacto').value,
            "nombreCliente": document.querySelector('#input-nombreCliente').value,
            "apellidoCliente": document.querySelector('#input-apellidoCliente').value,
            "email": document.querySelector('#input-email').value,
            "fax": document.querySelector('#input-fax').value,
            "telefono": document.querySelector('#input-telefono').value,
            "ciudadId": document.querySelector('#select-ciudad').value,
            "direccionId": document.querySelector('#select-direccion').value,
            "empleadoRepVentasId": document.querySelector('#select-empRepVentas').value,
            "limiteCredito": document.querySelector('#input-limiteCredito').value
        };
        editarCliente(cliente.idCliente, newDict);
    });
}

const createSearchDialog = (cliente) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    const title = document.createElement('h1');
    title.innerHTML = "Buscar Clientes";
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn, title);
    document.body.append(dialog);
    Object.values(cliente).forEach((item, i) => {        
        if (i !== 0) {
            const text = document.createElement('div');
            text.classList.add('text-container',`text-container-${i}`);
            dialog.append(text);
        }
    })
    getCiudadById(cliente.ciudadId).then(ciudad => {
        document.querySelector('.text-container-1').innerHTML = `<i class="bx bxs-circle"></i> Ciudad: ${ciudad.nombreCiudad}`;
    })
    getDireccionById(cliente.direccionId).then(direccion => {
        document.querySelector('.text-container-2').innerHTML = `<i class="bx bxs-circle"></i> Direccion: ${direccion.direccion}`;
    })
    getEmpleadoById(cliente.empleadoRepVentasId).then(empRepVentas => {
        document.querySelector('.text-container-3').innerHTML = `<i class="bx bxs-circle"></i> Representante de Ventas: ${empRepVentas.nombre} ${empRepVentas.apellido1}`;
    })
    document.querySelector('.text-container-4').innerHTML = `<i class="bx bxs-circle"></i> Nombre del Contacto: ${cliente.nombreContacto}`;
    document.querySelector('.text-container-5').innerHTML = `<i class="bx bxs-circle"></i> Nombre del Cliente: ${cliente.nombreCliente}`;
    document.querySelector('.text-container-6').innerHTML = `<i class="bx bxs-circle"></i> Apellido del Cliente: ${cliente.apellidoCliente}`;
    document.querySelector('.text-container-7').innerHTML = `<i class="bx bxs-circle"></i> Email: ${cliente.email}`;
    document.querySelector('.text-container-8').innerHTML = `<i class="bx bxs-circle"></i> Fax: ${cliente.fax}`;
    document.querySelector('.text-container-9').innerHTML = `<i class="bx bxs-circle"></i> Telefono: ${cliente.telefono}`;
    document.querySelector('.text-container-10').innerHTML = `<i class="bx bxs-circle"></i> Limite de Credito: ${cliente.limiteCredito}`;
    dialog.showModal();    
}

const opClientes = document.getElementById('opClientes');

opClientes.addEventListener('click', ()=>{
    createAgregarForm();
});

const eventosClientes = () => {
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
    eventosClientes
}