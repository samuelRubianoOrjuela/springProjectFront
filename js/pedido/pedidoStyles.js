import {
    agregarPedido,
    editarPedido,
    borrarPedido,
    getEstadosPedido,
    getEstadoPedidoById,
    getPedidos,
    getPedidoById
} from './pedidoPeticiones.js'
import{
    getClientes,
    getClienteById
} from '../cliente/clientePeticiones.js'
import{
    getPagos,
    getPagoById
} from '../pago/pagoPeticiones.js'

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
    /* 
    private Long idPedido;
    private LocalDate fechaPedido;
    private LocalDate fechaEsperada;
    private LocalDate fechaEntrega;
    private String comentarios;
    private Long idCliente;
    private String metodoPago;
    private Long idPago; 
    private Long idEstadoPedido; 
*/
    getPedidos().then(pedidos => {
        pedidos.forEach(p => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${p.idPedido} - ${p.fechaPedido} - ${p.fechaEntrega}`;
            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('bx', 'bx-trash');
            result.append(deleteBtn); 
            document.querySelector('.search-results').append(result);
            deleteBtn.addEventListener('click', () => {
                if (confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
                    borrarPedido(p.idPedido);
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

    getPedidos().then(pedidos => {
        pedidos.forEach(p => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${p.idPedido} - ${p.fechaPedido} - ${p.fechaEntrega}`;
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
    getPedidos().then(pedidos => {
        pedidos.forEach(p => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${p.idPedido} - ${p.fechaPedido} - ${p.fechaEntrega}`;
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
                    <label for="input-fechaPedido">Fecha del Pedido: </label>
                    <input type="date" id="input-fechaPedido">
                </div>
                <div class="box">
                    <label for="input-fechaEsperada">Fecha Esperada: </label>
                    <input type="date" id="input-fechaEsperada">
                </div>
                <div class="box">
                    <label for="input-fechaEntrega">Fecha de Entrega: </label>
                    <input type="date" id="input-fechaEntrega">
                </div>
                <div class="box">
                    <label for="input-comentarios">Comentarios: </label>
                    <input type="text" id="input-comentarios">
                </div>
                <div class="box">
                    <label for="select-cliente">Cliente: </label>
                    <select name="" id="select-cliente"></select>
                </div>
                <div class="box">
                    <label for="input-metodoPago">Metodo de Pago: </label>
                    <input type="text" id="input-metodoPago">
                </div>
                <div class="box">
                    <label for="select-pago">Pago: </label>
                    <select name="" id="select-pago"></select>
                </div>
                <div class="box">
                    <label for="select-estadoPedido">Estado del Pedido: </label>
                    <select name="" id="select-estadoPedido"></select>
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
    getPagos().then(pagos => {
        pagos.forEach(p => {                    
            const option = document.createElement('option');
            option.value = p.idPago;
            option.innerHTML = `${p.idFormaPago} - ${p.fechaPago} - $ ${p.total}`;
            document.getElementById('select-pago').append(option);
        })
    })
    getEstadosPedido().then(estadoPedido => {        
        estadoPedido.forEach(e => {                    
            const option = document.createElement('option');
            option.value = e.idEstado;
            option.innerHTML = e.nombreEstado;
            document.getElementById('select-estadoPedido').append(option);
        })
    })
    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "fechaPedido": document.querySelector('#input-fechaPedido').value,
            "fechaEsperada": document.querySelector('#input-fechaEsperada').value,
            "fechaEntrega": document.querySelector('#input-fechaEntrega').value,
            "comentarios": document.querySelector('#input-comentarios').value,
            "idCliente": document.querySelector('#select-cliente').value,
            "metodoPago": document.querySelector('#input-metodoPago').value,
            "idPago": document.querySelector('#select-pago').value,
            "idEstadoPedido": document.querySelector('#select-estadoPedido').value
        };        
        agregarPedido(newDict)
    });
}

const createEditDialog = (pedido) => {    
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    dialog.innerHTML = `
        <h1>Editar Oficina</h1>
        <form>
            <div class="box">
                <label for="input-fechaPedido">Fecha del Pedido: </label>
                <input type="date" id="input-fechaPedido">
            </div>
            <div class="box">
                <label for="input-fechaEsperada">Fecha Esperada: </label>
                <input type="date" id="input-fechaEsperada">
            </div>
            <div class="box">
                <label for="input-fechaEntrega">Fecha de Entrega: </label>
                <input type="date" id="input-fechaEntrega">
            </div>
            <div class="box">
                <label for="input-comentarios">Comentarios: </label>
                <input type="text" id="input-comentarios">
            </div>
            <div class="box">
                <label for="select-cliente">Cliente: </label>
                <select name="" id="select-cliente"></select>
            </div>
            <div class="box">
                <label for="input-metodoPago">Metodo de Pago: </label>
                <input type="text" id="input-metodoPago">
            </div>
            <div class="box">
                <label for="select-pago">Pago: </label>
                <select name="" id="select-pago"></select>
            </div>
            <div class="box">
                <label for="select-estadoPedido">Estado del Pedido: </label>
                <select name="" id="select-estadoPedido"></select>
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
            document.getElementById('select-cliente').append(option);
        })
    })
    getPagos().then(pagos => {
        pagos.forEach(p => {                    
            const option = document.createElement('option');
            option.id = p.idPago;
            option.value = p.idPago;
            option.innerHTML = `${p.idFormaPago} - ${p.fechaPago} - $ ${p.total}`;
            document.getElementById('select-pago').append(option);
        })
    })
    getEstadosPedido().then(estadoPedido => {        
        estadoPedido.forEach(e => {                    
            const option = document.createElement('option');
            option.id = e.idEstado;
            option.value = e.idEstado;
            option.innerHTML = e.nombreEstado;
            document.getElementById('select-estadoPedido').append(option);
        })
    })

    document.querySelector('#input-fechaPedido').value = pedido.fechaPedido;
    document.querySelector('#input-fechaEsperada').value = pedido.fechaEsperada;
    document.querySelector('#input-fechaEntrega').value = pedido.fechaEntrega;
    document.querySelector('#input-comentarios').value = pedido.comentarios;
    document.querySelector('#input-metodoPago').value = pedido.metodoPago;
    dialog.showModal();    

    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "fechaPedido": document.querySelector('#input-fechaPedido').value,
            "fechaEsperada": document.querySelector('#input-fechaEsperada').value,
            "fechaEntrega": document.querySelector('#input-fechaEntrega').value,
            "comentarios": document.querySelector('#input-comentarios').value,
            "idCliente": document.querySelector('#select-cliente').value,
            "metodoPago": document.querySelector('#input-metodoPago').value,
            "idPago": document.querySelector('#select-pago').value,
            "idEstadoPedido": document.querySelector('#select-estadoPedido').value
        };
        editarPedido(pedido.idPedido, newDict);
    });
}

const createSearchDialog = (pedido) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    const title = document.createElement('h1');
    title.innerHTML = "Buscar Pedidos";
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn, title);
    document.getElementById('app').append(dialog);
    Object.values(pedido).forEach((item, i) => {        
        if (i !== 0) {
            const text = document.createElement('div');
            text.classList.add('text-container',`text-container-${i}`);
            dialog.append(text);
        }
    })
    getClienteById(pedido.idCliente).then(cliente => {
        document.querySelector('.text-container-1').innerHTML = `<i class="bx bxs-circle"></i> Cliente: ${cliente.nombreContacto}`;
    })
    getPagoById(pedido.idPago).then(pago => {
        document.querySelector('.text-container-2').innerHTML = `<i class="bx bxs-circle"></i> Pago: ${pago.idFormaPago} - ${pago.fechaPago} - $ ${pago.total}`;
    })
    getEstadoPedidoById(pedido.idEstadoPedido).then(estadoPedido => {
        document.querySelector('.text-container-3').innerHTML = `<i class="bx bxs-circle"></i> Estado del Pedido: ${estadoPedido.nombreEstado}`;
    })
    document.querySelector('.text-container-4').innerHTML = `<i class="bx bxs-circle"></i> Fecha del Pedido: ${pedido.fechaPedido}`;
    document.querySelector('.text-container-5').innerHTML = `<i class="bx bxs-circle"></i> Fecha Esperada: ${pedido.fechaEsperada}`;
    document.querySelector('.text-container-6').innerHTML = `<i class="bx bxs-circle"></i> Fecha de Entrega: ${pedido.fechaEntrega}`;
    document.querySelector('.text-container-7').innerHTML = `<i class="bx bxs-circle"></i> Comentarios: ${pedido.comentarios}`;
    document.querySelector('.text-container-8').innerHTML = `<i class="bx bxs-circle"></i> Metodo de Pago: ${pedido.metodoPago}`;
    dialog.showModal();   
}

const opPedidos = document.getElementById('opPedidos');

opPedidos.addEventListener('click', ()=>{
    createAgregarForm();
});

const eventosPedidos = () => {
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
    eventosPedidos
}