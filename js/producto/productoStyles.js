import {
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
} from './productoPeticiones.js'

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
    getOficinas().then(oficinas => {
        oficinas.forEach(o => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${o.idOficina} - ${o.lineaDireccion1} - ${o.lineaDireccion2}`;
            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('bx', 'bx-trash');
            result.append(deleteBtn); 
            document.querySelector('.search-results').append(result);
            deleteBtn.addEventListener('click', () => {
                if (confirm("¿Estás seguro de que deseas eliminar esta oficina?")) {
                    borrarOficina(o.idOficina);
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
    getOficinas().then(oficinas => {
        oficinas.forEach(o => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${o.idOficina} - ${o.lineaDireccion1} - ${o.lineaDireccion2}`;
            const searchBtn = document.createElement('i');
            searchBtn.classList.add('bx', 'bx-info-circle');
            result.append(searchBtn); 
            document.querySelector('.search-results').append(result);
            searchBtn.addEventListener('click', () => {
                createSearchDialog(o);
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
    getOficinas().then(oficinas => {
        oficinas.forEach(o => {
            const result = document.createElement('div');
            result.classList.add('info-container');
            result.innerHTML = `${o.idOficina} - ${o.lineaDireccion1} - ${o.lineaDireccion2}`;
            const editBtn = document.createElement('i');
            editBtn.classList.add('bx', 'bx-edit');
            result.append(editBtn); 
            document.querySelector('.search-results').append(result);
            editBtn.addEventListener('click', () => {
                createEditDialog(o);
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
                    <label for="select-gama">Gama: </label>
                    <select name="" id="select-gama"></select>
                </div>
                <div class="box">
                    <label for="select-dimension">Dimensión: </label>
                    <select name="" id="select-dimension"></select>
                </div>
                <div class="box">
                    <label for="select-proveedor">Proveedor: </label>
                    <select name="" id="select-proveedor"></select>
                </div>
                <div class="box">
                    <label for="input-descripcion">Descripcion: </label>
                    <input type="text" id="input-descripcion">
                </div>
                <div class="box">
                    <label for="input-stock">Cantidad en Stock: </label>
                    <input type="number" id="input-stock">
                </div>
                <div class="box">
                    <label for="input-precioVenta">Precio de Venta: </label>
                    <input type="number" id="input-precioVenta">
                </div>
                <div class="box">
                    <label for="input-precioProveedor">Precio de Proveedor: </label>
                    <input type="number" id="input-precioProveedor">
                </div>
                <button class="submit-button">+</button>
            </form>
        </div>
    `;
    getGamas().then(gamas => {
        gamas.forEach(g => {                                
            const option = document.createElement('option');
            option.value = g.gama;
            option.innerHTML = g.gama;
            document.getElementById('select-gama').append(option);
        })
    })
    getDimensiones().then(dimensiones => {
        dimensiones.forEach(d => {                    
            const option = document.createElement('option');
            option.value = d.idDimensiones;
            option.innerHTML = `Alto: ${d.alto} - Ancho ${d.ancho} - Largo: ${d.largo}`;
            document.getElementById('select-dimension').append(option);
        })
    })
    getProveedores().then(proveedores => {
        proveedores.forEach(p => {                    
            const option = document.createElement('option');
            option.value = p.idProveedor;
            option.innerHTML = p.nombre;
            document.getElementById('select-proveedor').append(option);
        })
    })
    /* 
    private String nombre;
    private String gama;
    private Long idDimensiones;
    private Long idProveedor;
    private String descripcion;
    private Short cantidadEnStock;
    private BigDecimal precioVenta;
    private BigDecimal precioProveedor;
    */
    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "nombre": document.querySelector('#input-nombre').value,
            "gama": document.querySelector('#select-gama').value,
            "idDimensiones": document.querySelector('#select-dimension').value,
            "idProveedor": document.querySelector('#select-proveedor').value,
            "descripcion": document.querySelector('#input-descripcion').value,
            "cantidadEnStock": document.querySelector('#input-stock').value,
            "precioVenta": document.querySelector('#input-precioVenta').value,
            "precioProveedor": document.querySelector('#input-precioProveedor').value
        };
        agregarProducto(newDict)
    });
}

const createEditDialog = (oficina) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    dialog.innerHTML = `
        <h1>Editar Oficina</h1>
        <form>
            <div class="box">
                <label for="select-ciudad">Ciudad: </label>
                <select id="select-ciudad"></select>
            </div>
            <div class="box">
                <label for="input-telefono">Telefono: </label>
                <input type="number" id="input-telefono">
            </div>
            <div class="box">
                <label for="input-direccion1">Direccion 1: </label>
                <input type="text" id="input-direccion1">
            </div>
            <div class="box">
                <label for="input-direccion2">Direccion 2: </label>
                <input type="text" id="input-direccion2">
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
    getCiudades().then(ciudades => {
        ciudades.forEach(c => {        
            const option = document.createElement('option');
            option.id = c.idCiudad;
            option.value = c.idCiudad;
            option.innerHTML = c.nombreCiudad;
            if (oficina.idCiudad === c.idCiudad) {option.setAttribute('selected','')}
            document.getElementById('select-ciudad').append(option);
        })
    })
    document.getElementById('input-telefono').value = oficina.telefono;
    document.getElementById('input-direccion1').value = oficina.lineaDireccion1;
    document.getElementById('input-direccion2').value = oficina.lineaDireccion2;
    document.querySelector(".submit-button").addEventListener('click', (e) => {
        e.preventDefault();
        const newDict = {
            "idCiudad": document.querySelector('#select-ciudad').value,
            "telefono": document.querySelector('#input-telefono').value,
            "lineaDireccion1": document.querySelector('#input-direccion1').value,
            "lineaDireccion2": document.querySelector('#input-direccion2').value
        };
        editarOficina(oficina.idOficina, newDict);
    });
    dialog.showModal();    
}

const createSearchDialog = (oficina) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('container');
    const title = document.createElement('h1');
    title.innerHTML = "Buscar Oficinas";
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn, title);
    document.getElementById('app').append(dialog);
    Object.values(oficina).forEach((item, i) => {        
        if (i !== 0) {
            const text = document.createElement('div');
            text.classList.add('text-container',`text-container-${i}`);
            dialog.append(text);
        }
    })
    getCiudadById(oficina.idCiudad).then(ciudad => {
        document.querySelector('.text-container-1').innerHTML = `<i class="bx bxs-circle"></i> Ciudad: ${ciudad.nombreCiudad}`;
    })
    document.querySelector('.text-container-2').innerHTML = `<i class="bx bxs-circle"></i> Telefono: ${oficina.telefono}`;
    document.querySelector('.text-container-3').innerHTML = `<i class="bx bxs-circle"></i> Direccion 1: ${oficina.lineaDireccion1}`;
    document.querySelector('.text-container-4').innerHTML = `<i class="bx bxs-circle"></i> Direccion 2: ${oficina.lineaDireccion2}`;
    dialog.showModal();    
}

const opOficinas = document.getElementById('opProductos');

opOficinas.addEventListener('click', ()=>{
    createAgregarForm();
});

const eventosOficina = () => {
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
    eventosOficina
}