# Documentación de Métodos de Peticiones Fetch
BY: Frank Gonzalo Robles Moreno & Samuel Rubiano Orjuela

Este documento proporciona una guía sobre los métodos de peticiones fetch implementados en este proyecto, así como su funcionalidad y uso adecuado.

## Introducción

En este proyecto, se utilizan peticiones fetch para comunicarse con un servidor HTTP y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en recursos almacenados en dicho servidor. Las peticiones fetch son una forma moderna y eficiente de realizar solicitudes HTTP en JavaScript.

## Métodos

### `getOptions(endPoint, select, selected)`

Este método realiza una solicitud GET al `endPoint` especificado y carga las opciones correspondientes en un elemento `<select>` del DOM.

- Parámetros:
  - `endPoint`: El punto final de la API al que se realizará la solicitud.
  - `select`: El elemento `<select>` del DOM donde se cargarán las opciones.
  - `selected`: El valor que se preseleccionará en el elemento `<select>`.

### `getData(endPoint)`

Este método realiza una solicitud GET al `endPoint` especificado y devuelve los datos obtenidos del servidor.

- Parámetros:
  - `endPoint`: El punto final de la API al que se realizará la solicitud.
- **Devuelve:** Una promesa que se resuelve con los datos obtenidos del servidor en formato JSON.

### `loadData(endPoint, newDict)`

Este método envía una solicitud POST al `endPoint` especificado para cargar nuevos datos en el servidor.

- Parámetros:
  - `endPoint`: El punto final de la API al que se realizará la solicitud.
  - `newDict`: Un objeto que contiene los datos que se cargarán en el servidor.

### `updateData(endPoint, id, newDict)`

Este método envía una solicitud PUT al `endPoint` especificado para actualizar los datos de un recurso específico en el servidor.

- Parámetros:
  - `endPoint`: El punto final de la API al que se realizará la solicitud.
  - `id`: El identificador del recurso que se actualizará.
  - `newDict`: Un objeto que contiene los nuevos datos que se utilizarán para actualizar el recurso.

### `deleteData(endPoint, id)`

Este método envía una solicitud DELETE al `endPoint` especificado para eliminar un recurso específico en el servidor.

- Parámetros:
  - `endPoint`: El punto final de la API al que se realizará la solicitud.
  - `id`: El identificador del recurso que se eliminará.

## Uso

Para utilizar estos métodos en tu proyecto, simplemente importa las funciones desde este módulo y úsalas según sea necesario. Asegúrate de proporcionar los parámetros requeridos para cada método y manejar las promesas devueltas según sea necesario en tu aplicación.

```js
import { getOptions, getData, loadData, updateData, deleteData } from './api.js';
```
