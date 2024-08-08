import {
	eventosEmpleado
} from './empleado/empleadoStyles.js'
import {
	eventosOficina
} from './oficina/oficinaStyles.js'
import {
	eventosClientes
} from './cliente/clienteStyles.js'
// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');
allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}
		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})
// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');
const foto = document.querySelector('.contenedor-foto');
const titulo = document.querySelector('.titulo');
if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}
toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
	foto.style.left = '5px';
	titulo.style.opacity = '0';

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
		
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.toggle('hide');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allDropdown.forEach(item => {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('hide');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})
sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		foto.style.left = '5px';
		titulo.style.opacity = '0';
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.toggle('hide');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})
sidebar.addEventListener('mouseenter', function () {
	foto.style.left = '20px';
	titulo.style.opacity = '1';

	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('hide');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})
// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');
imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})
// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');
allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})
window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})
// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');
allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})

const opciones = document.querySelectorAll('.opMenu');
const formularios = document.getElementById('formularios-container');
const botonesContainer = document.getElementById('botones');
const ventanas = document.querySelectorAll('.ventana');

opciones.forEach(opcion => {
	opcion.addEventListener('click', () => {
		let botones = document.querySelectorAll('.boton');
		botones.forEach(boton => {
			boton.remove();
		})
		for (let i = 0; i <= 3; i++) {
			const boton = document.createElement('li');
			boton.classList.add('boton');
			
			switch (i) {
				case 0:
					boton.id = 'boton-agregar';
					boton.textContent = 'Agregar';
					boton.classList.toggle('active');
					break;			
				case 1:
					boton.id = 'boton-editar';
					boton.textContent = 'Editar';
					break;			
				case 2:
					boton.id = 'boton-buscar';
					boton.textContent = 'Buscar';
					break;			
				case 3:
					boton.id = 'boton-borrar';
					boton.textContent = 'Borrar';
					break;			
			}
			botonesContainer.append(boton);
		}
		botones = document.querySelectorAll('.boton');
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
		if(!opcion.classList.contains('active')){
			formularios.classList.add('active');
		}
		botones.forEach((b, i) => {
			ventanas[i].classList.remove('active');
		})
		document.getElementById('ventana-agregar').classList.toggle('active');
		switch (opcion.firstElementChild.id) {
			case 'opEmpleados':
				eventosEmpleado();
				break;
			case 'opOficinas':
				eventosOficina();
				break;
			case 'opClientes':
				eventosClientes();
				break;
			default:
				break;
		}
	});
})