const socket = io();

const lista = document.getElementById('mensajes');
const input = document.getElementById('input');
const enviar = document.getElementById('enviar');

//mostrar mensajes

function mostrarMensaje(msg){
    const li=document.createElement('li');
    li.textContent = msg.usuario + ': ' + msg.mensaje;
    lista.appendChild(li);
}

//cargar histórico
socket.on('historico', (mensajes) => {
    mensajes.forEach(mostrarMensaje);
});

//recibir mensajes
socket.on('mensaje', (msg) => {
    mostrarMensaje(msg);
});

//enviar mensajes
enviar.onclick = () => {
    socket.emit('mensaje', {
        usuario: window.USER,
        mensaje: input.value
    });
    input.value = '';
};