import {
    getOptions,
    getData,
    deleteData
} from './crud.js';
// import { loadDataActivos } from './productos.js';
// import { loadDataEstados } from './clientes.js';
// import { loadDataMarcas } from './pedidos.js';
// import { loadDataPersonas } from './empleados.js';
// import { loadDataTipoActivos } from './pagos.js';
// import { loadDataTipoMovAct } from './oficinas.js';
// import { loadDataTipoPersona } from './tipoPersona.js';
let name, text, number, select, label, container, div, search, searchInput, openBtn, input, button, box, submit, dialog, closeBtn;

const info = {
    "activos":{
        "name": ['name', 'activos'],
        "id": ['text', 'ID'],
        "nombre": ['text', 'Nombre'],
        "transaccion": ['text', 'Código de transacción'],
        "formulario": ['text', 'Número de formulario'],
        "marcas": ['select', 'ID marca'],       
        "ubicacion": ['select', 'Ubicación'],    
        "categorias": ['select', 'ID categoría'],
        "tipos": ['select', 'ID tipo'],
        "valorUnitario": ['number', 'Valor unitario'],
        "proveedor": ['text', 'ID proveedor'],
        "nroSerial": ['text', 'Número serial'],
        "empresaResponsable": ['text', 'ID empresa responsable'],
        "estados": ['select', 'ID estado']
    },
    "marcas": {
        "name": ['name', 'marcas'],
        "id": ['text', 'ID'],
        "nombre": ['text', 'Nombre']
    },
    "personas": {
        "name": ['name', 'personas'],
        "tipoDocumento": ['select', 'Tipo de documento'],
        "id": ['number', 'ID'],
        "nit": ['number', 'NIT'],
        "nombre": ['text', 'Nombre'],
        "email": ['text', 'Email'],
        "tipoPersona": ['select', 'Tipo de persona']
    },
    "estados": {
        "name": ['name', 'estados'],
        "id": ['text', 'ID'],
        "nombre": ['text', 'Nombre']
    },
    "tipoPersona": {
        "name": ['name', 'tipo de personas'],
        "id": ['text', 'ID'],
        "nombre": ['text', 'Nombre']
    },
    "tipoMovAct": {
        "name": ['name', 'tipo de movimientos de activos'],
        "id": ['text', 'ID'],
        "nombre": ['text', 'Nombre']
    },
    "tipoActivos": {
        "name": ['name', 'tipo de activos'],
        "id": ['text', 'ID'],
        "nombre": ['text', 'Nombre'],
        "email": ['text', 'Email'],
    },
}

// const whichFunction = (cat, action, id) => {
//     switch (cat) {
//         case 'activos':
//             loadDataActivos(action, id);
//         case 'marcas':
//             loadDataMarcas(action, id);
//         case 'personas':
//             loadDataPersonas(action, id);
//         case 'estados':
//             loadDataEstados(action, id);
//         case 'tipoPersona':
//             loadDataTipoPersona(action, id);
//         case 'tipoMovAct':
//             loadDataTipoMovAct(action, id);
//         case 'tipoActivos':
//             loadDataTipoActivos(action, id);
//     }
// }

const removeElements = () => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.remove();
    });
}

const createDialog = (action, element, cat) => {
    dialog = document.createElement('dialog');
    dialog.classList.add('container', `modal-${element.id}`);
    name = document.createElement('h1');
    name.textContent = action[0].toUpperCase()+action.slice(1)+' '+info[cat].name[1];    closeBtn = document.createElement('i');
    closeBtn.classList.add('bx', 'bx-x');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    dialog.append(closeBtn, name);
    console.log(element, Object.values(element));
    const arrayInfo = Object.values(info[cat]);
    const arrayElement = Object.values(element);

    switch (action){
        case 'editar':
            createFormElements(action, dialog, arrayElement, cat);
            submit = document.createElement('button');
            submit.classList.add('submit-button', `submit-${cat}`);
            submit.setAttribute('type', 'submit')
            submit.innerHTML = '+';
            submit.addEventListener('click', (e) => {
                e.preventDefault();
                whichFunction(cat, action, `/${element.id}`,);
            })
            dialog.appendChild(submit);
            break;
        case 'eliminar':
            box.innerHTML += `<i class="bx bxs-circle"></i> ${arrayInfo[j][1]}: ${arrayElement[j-1]}`;
            dialog.appendChild(box);
            break;                
        case 'buscar':
            for (let j = 1; j < arrayInfo.length; j++){
                box = document.createElement('div');
                box.classList.add('text-container');
                box.innerHTML += `<i class="bx bxs-circle"></i> ${arrayInfo[j][1]}: ${arrayElement[j-1]}`;
                dialog.appendChild(box);
            }
            break;
    }
    document.body.append(dialog);
    dialog.showModal();
}

const createSearchElements = (cat, action) => {
    container = document.createElement('div');
    container.classList.add('container', action);
    container.id = `${action}-${cat}`;
    search = document.createElement('div');
    search.classList.add('search-bar');
    input = document.createElement('input');
    input.id = action+'-input-'+cat;
    input.classList.add('search-input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Introduce la información de búsqueda...');
    button = document.createElement('button');
    button.id = 'search-button';
    button.innerHTML = '<i class="bx bx-search"></i>';
    div = document.createElement('div');
    div.classList.add('search-results');
    search.append(input, button);
    container.append(search, div);
    document.querySelector('#content').append(container);

    getData(cat).then(data => {
        console.log(data);
        data.forEach((element, i) => {
            let box = document.createElement('div');
            box.id = `box-${cat+'_'+i}`;
            box.classList.add('info-container');
            switch (cat) {
                case 'activos':
                    box.innerHTML = `${element.id}  -  ${element.nombre} - ${element.idEstado}`;
                    break;
                case 'personas':
                case 'tipoActivos':
                    box.innerHTML = `${element.id}  -  ${element.nombre} - ${element.email}`;
                    break;
                default:
                    box.innerHTML = `${element.id}  -  ${element.nombre}`;
                    break;
            }
            openBtn = document.createElement('i');
            openBtn.id = `iconOpen-${cat+'_'+i}`;
            switch (action){
                case 'buscar':
                    openBtn.classList.add('bx', 'bx-info-circle');
                    break;
                case 'editar':
                    openBtn.classList.add('bx', 'bx-edit');
                    break;
                case 'eliminar':
                    openBtn.classList.add('bx', 'bx-trash');
                    break;
            }
            box.append(openBtn);
            div.append(box);
            openBtn.addEventListener('click', () => {
                switch (action){
                    case 'eliminar':
                        deleteData(cat, `/${element.id}`);
                        break;
                    default:
                        createDialog(action, element, cat);
                        break;
                }
            });
        });
        searchInput = document.getElementById(action+'-input-'+cat);
        searchInput.addEventListener('input', () => {
            let searchValue = searchInput.value.toLowerCase();
            let infoContainers = document.querySelectorAll('.info-container');
            infoContainers.forEach(container => {
                let containerText = container.textContent.toLowerCase();
                if (containerText.includes(searchValue)) {
                    container.style.display = 'flex';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });
}
 
const createOficinaElements = () => {
    const mainTag = document.getElementById('main');
    mainTag.innerHTML = `
        <div class="botones">
            <ul>
                <li class="boton active">Agregar</li>
                <li class="boton">Editar</li>
                <li class="boton">Consultar</li>
                <li class="boton">Eliminar</li>
            </ul>
        </div>
        <div class="ventanas">
            <ul>
                <li class="ventana active">
                    <div class="container">
                        <form>
                            <label for="select-ciudad">Ciudad: </label>
                            <select name="" id="select-ciudad"></select>
                            <label for="input-telefono">Telefono: </label>
                            <input type="number" id="input-telefono">
                            <label for="input-direccion1">Direccion 1: </label>
                            <input type="text" id="input-direccion1">
                            <label for="input-direccion2">Direccion 2: </label>
                            <input type="text" id="input-direccion2">
                            <button class="submit-button">+</button>
                        </form>
                    </div>
                </li>
                <li class="ventana">EditarEditar</li>
                <li class="ventana">ConsultarConsultar</li>
                <li class="ventana">EliminarEliminar</li>
            </ul>
        </div>
    `;
    const botones = document.querySelectorAll('.boton');
	const ventanas = document.querySelectorAll('.ventana');
    
	botones.forEach((b, i) => {
		b.addEventListener('click', () => {

			botones.forEach((b, i) => {
				ventanas[i].classList.remove('active');
				b.classList.remove('active');
			})
			ventanas[i].classList.toggle('active');
			b.classList.toggle('active');
		})
	})


}

const createFormElements = (action, container, arrayElement, cat) => {
    let j = -1;
    for (let i in info[cat]){
        box = document.createElement('div');
        box.classList.add('box');
        box.id = `box-${i}`;
        label = document.createElement('label');
        label.innerHTML = `${info[cat][i][1]}: `;
        switch (info[cat][i][0]) {
            case 'text':
                text = document.createElement('input');
                text.setAttribute('type', 'text');
                text.id = `input-${i}`;
                text.value = action === 'editar' ? arrayElement[j] : '';
                label.setAttribute('for', text.id);
                box.append(label, text);
                break;
            case 'number':
                number = document.createElement('input');
                number.setAttribute('type', 'number');
                number.id = `input-${i}`;
                number.value = action === 'editar' ? arrayElement[j] : '';
                label.setAttribute('for', number.id);
                box.append(label, number);
                break;
            case 'select':
                select = document.createElement('select');
                select.id = `input-${i}`;
                let selected = action === 'editar' ? arrayElement[j] : '';
                getOptions(i, select, selected);
                label.setAttribute('for', select.id);
                box.append(label, select);
                break;
            default:
                break;
        }
        container.appendChild(box);
        j++;
    }

}

export {
    createOficinaElements,
    createFormElements
}; 
