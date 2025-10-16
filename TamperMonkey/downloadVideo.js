// ==UserScript==
// @name         Download Video MP3/MP4
// @namespace    http://tampermonkey.net/
// @version      2025-10-16
// @description  Download directly videos as MP3 or MP4 from YOUTUBE.
// @author       Alejandro Fernández Muñoz
// @match        https://www.youtube.com/watch*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function(){
    'use strict'; //El modo estricto ayuda a detectar errores, no usar variables sin declarar, etc.

    //Funcion para crear un boton
    function crearBoton(texto, color, callblack){ //Calback es una funcion de retorno, se utiliza para ejeccutar una función despues de que otra función haya terminado su tarea
        const boton = document.createElement('button');
        boton.textContent = texto;
        boton.style.backgroundColor = color;
        boton.style.color = 'white';
        boton.style.border = 'none';
        boton.style.padding = '10px 20px';
        boton.style.margin = '5px';
        boton.style.cursor = 'pointer';
        boton.style.borderRadius = '5px';
        boton.addEventListener('click', callblack); //addEventListener es un método que se usa para registrar un evento, en este caso el click
        return boton;
    }

    function obtenerVideoID(){
        const url = new URL(window.location.href);
        return url.searchParams.get('v'); //devuelve el valor despues de v=
    }

    //Insertar botones cuando el DOM cambie
    function insertarBotones(){
        const contenedor = document.querySelector('#above-the-fold #title'); //Selecciona el contenedor donde se insertarán los botones
        if (!contenedor || document.querySelector('#btnDescargarMP3')){
            return; //Si no existe el contenedor o ya existen los botones, salir de la función
        }
        const videoID = obtenerVideoID();
        if (!videoID){
            return;
        }
        const url = window.location.href; //Obtener la URL actual
        const btnMP3 = crearBoton('Descargar MP3','#f51f08ff',()=> {
            window.open(`https://es.y2mate.tube/convert/?videoId=${videoID}`, '_blank');
        }); //Crear botón para descargar MP3
        btnMP3.id = 'btnDescargarMP3'; //Asignar un ID al botón para evitar duplicados

        const btnMP4 = crearBoton('Descargar MP4','#08f51fff',function() {
            window.open(`https://es.y2mate.tube/convert/?videoId=${videoID}`, '_blank'); //_blank abre el enlace en una nueva pestaña
        });
        btnMP4.id = 'btnDescargarMP4'; //Asignar un ID al botón para evitar duplicados

        contenedor.appendChild(btnMP3); //Insertar botón MP3 en el contenedor
        contenedor.appendChild(btnMP4); //Insertar botón MP4 en el contenedor
    }

    //Observar cambios en el DOM, youtube carga contenido dinamicamente, sin recargar la pagina
     // Usamos un observador para detectar cuando YouTube carga un nuevo vídeo sin recargar la página
    const observador = new MutationObserver(() => insertarBotones());
    observador.observe(document.body, { childList: true, subtree: true });

    // Intentar insertar al cargar la página
    window.addEventListener('yt-navigate-finish', insertarBotones);
    insertarBotones();
})();
