import {
    agregarPago,
    editarPago,
    borrarPago,
    getFormasPago,
    getFormaPagoById,
    getPagos,
} from './pagoPeticiones.js'
import{
    getClientes,
    getClienteById
} from '../cliente/clientePeticiones.js'

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
    getPagos().then(pagos => {
        pagos.forEach(p => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${p.idFormaPago} - ${p.fechaPago} - $ ${p.total}`;
            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('bx', 'bx-trash');
            result.append(deleteBtn); 
            document.querySelector('.search-results').append(result);
            deleteBtn.addEventListener('click', () => {
                if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
                    borrarPago(p.idPago);
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
    getPagos().then(pagos => {
        pagos.forEach(p => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${p.idFormaPago} - ${p.fechaPago} - $ ${p.total}`;
            const searchBtn = document.createElement('i');
            searchBtn.classList.add('bx', 'bx-info-circle');
            result.append(searchBtn); 
            document.querySelector('.search-results').append(result);
            searchBtn.addEventListener('click', () => {
                createSearchDialog(p);
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
    getPagos().then(pagos => {
        pagos.forEach(p => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${p.idFormaPago} - ${p.fechaPago} - $ ${p.total}`;
            const editBtn = document.createElement('i');
            editBtn.classList.add('bx', 'bx-edit');
            result.append(editBtn); 
            document.querySelector('.search-results').append(result);
            editBtn.addEventListener('click', () => {
                createEditDialog(p);
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
                    <label for="select-cliente">Cliente: </label>
                    <select name="" id="select-cliente"></select>
                </div>
                <div class="box">
                    <label for="select-formaPago">Forma de Pago: </label>
                    <select name="" id="select-formaPago"></select>
                </div>
                <div class="box">
                    <label for="input-fechaPago">Fecha de Pago: </label>
                    <input type="date" id="input-fechaPago">
                </div>
                <div class="box">
                    <label for="input-total">Total: </label>
                    <input type="number" id="input-total">
                </div>
                <button class="submit-button">+</button>
            </form>
        </div>
    `;
    getClientes().then(clientes => {
        clientes.forEach(c => {                    
            const option = document.createElement('option');
            option.value = c.idCliente;
            option.innerHTML = `${c.nombreContacto} - ${c.nombreCliente} - ${c.apellidoCliente}`;
            document.getElementById('select-cliente').append(option);
        })
    })
    getFormasPago().then(formasPago => {
        formasPago.forEach(f => {                    
            const option = document.createElement('option');
            option.value = f.idFormaPago;
            option.innerHTML = f.nombreFormaPago;
            document.getElementById('select-formaPago').append(option);
        })
    })

    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "idCliente": document.querySelector('#select-cliente').value,
            "idFormaPago": document.querySelector('#select-formaPago').value,
            "fechaPago": document.querySelector('#input-fechaPago').value,
            "total": document.querySelector('#input-total').value
        };        
        agregarPago(newDict);
    });
}

const createEditDialog = (pago) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');

    dialog.innerHTML = `
        <h1>Editar Oficina</h1>
            <form>
                <div class="box">
                    <label for="select-cliente">Cliente: </label>
                    <select name="" id="select-cliente"></select>
                </div>
                <div class="box">
                    <label for="select-formaPago">Forma de Pago: </label>
                    <select name="" id="select-formaPago"></select>
                </div>
                <div class="box">
                    <label for="input-fechaPago">Fecha de Pago: </label>
                    <input type="date" id="input-fechaPago">
                </div>
                <div class="box">
                    <label for="input-total">Total: </label>
                    <input type="number" id="input-total">
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
    document.getElementById('app').append(dialog);

    getClientes().then(clientes => {
        clientes.forEach(c => {        
            const option = document.createElement('option');
            option.id = c.idCliente;
            option.value = c.idCliente;
            option.innerHTML = `${c.nombreContacto} - ${c.nombreCliente} - ${c.apellidoCliente}`;
            if (pago.idCliente === c.idCliente) {option.setAttribute('selected','')}
            document.getElementById('select-cliente').append(option);
        })
    });
    getFormasPago().then(formasPago => {
        formasPago.forEach(f => {        
            const option = document.createElement('option');
            option.id = f.idFormaPago;
            option.value = f.idFormaPago;
            option.innerHTML = f.nombreFormaPago;
            if (pago.idFormaPago === f.idFormaPago) {option.setAttribute('selected','')}
            document.getElementById('select-formaPago').append(option);
        })
    });
    document.querySelector('#input-fechaPago').value = pago.fechaPago;
    document.querySelector('#input-total').value = pago.total;
    dialog.showModal();    

    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "idCliente": document.querySelector('#select-cliente').value,
            "idFormaPago": document.querySelector('#select-formaPago').value,
            "fechaPago": document.querySelector('#input-fechaPago').value,
            "total": document.querySelector('#input-total').value
        };
        editarPago(pago.idPago, newDict);
    });
}

const createSearchDialog = (pago) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    const title = document.createElement('h1');
    title.innerHTML = "Buscar Pagos";
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn, title);
    document.getElementById('app').append(dialog);
    Object.values(pago).forEach((item, i) => {        
        if (i !== 0) {
            const text = document.createElement('div');
            text.classList.add('text-container',`text-container-${i}`);
            dialog.append(text);
        }
    })
        /* 
    private Long idPago;
    private Long idCliente;
    private Long idFormaPago;
    private LocalDate fechaPago;
    private BigDecimal total;
*/
    getClienteById(pago.idCliente).then(cliente => {
        document.querySelector('.text-container-1').innerHTML = `<i class="bx bxs-circle"></i> Cliente: ${cliente.nombreContacto} - ${cliente.nombreCliente} - ${cliente.apellidoCliente}`;
    })
    getFormaPagoById(pago.idFormaPago).then(formaPago => {
        document.querySelector('.text-container-2').innerHTML = `<i class="bx bxs-circle"></i> Forma de Pago: ${formaPago.nombreFormaPago}`;
    })
    document.querySelector('.text-container-3').innerHTML = `<i class="bx bxs-circle"></i> Fecha de Pago: ${pago.fechaPago}`;
    document.querySelector('.text-container-4').innerHTML = `<i class="bx bxs-circle"></i> Total: $ ${pago.total}`;
    dialog.showModal();    
}

const opPagos = document.getElementById('opPagos');

opPagos.addEventListener('click', ()=>{
    createAgregarForm();
});

const eventosPagos = () => {
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
    eventosPagos
}