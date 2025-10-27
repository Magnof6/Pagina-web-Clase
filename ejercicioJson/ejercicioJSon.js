require('dotenv').config();
const os = require('os');
const process = require('process');
const http = require('http');
const port = process.env.PORT || 3000;
const config = {
    intervaloSegundos: parseInt(process.env.INTERVALO_SEGUNDOS || "5"),
    mostrarCPU: process.env.MOSTRAR_CPU === 'true',
    mostrarMemoria: process.env.MOSTRAR_MEMORIA === 'true',
    mostrarTiempoSistema: process.env.MOSTRAR_TIEMPO_SISTEMA === 'true',
    mostrarTiempoNode: process.env.MOSTRAR_TIEMPO__NODE === 'true',
};

//Mostrar info inicial

console.log("SERVIDOR NODE.JS INICIADO CON LA SIGUIENTE CONFIGURACIÓN:");
console.log(`Versión de Node.js: ${process.version}`);
console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
console.log(`Arquitectura: ${os.arch()}`);
console.log(`Host: ${os.hostname()}`);
console.log(`CPU: ${os.cpus()[0].model}`);
console.log("===============================");

const inicioNode = Date.now();//Tiempo de inicio del proceso Node.js

function obtenerUsoCPU() {
    const cpus = os.cpus();
    let usoUsuario = 0;// Tiempo en modo usuario
    let usoSistema = 0;// Tiempo en modo sistema
    let usoIdle = 0; // Tiempo inactivo
    let usoNice = 0;// Tiempo de baja prioridad
    let usoIrq = 0;// Tiempo de interrupciones

    for (const cpu of cpus){
        usoUsuario += cpu.times.user;
        usoSistema += cpu.times.sys;
        usoIdle += cpu.times.idle;
        usoNice += cpu.times.nice;
        usoIrq += cpu.times.irq;
    }
    const total = usoUsuario + usoSistema + usoIdle + usoNice + usoIrq;
    if (total === 0) {
        return 0;
    }
    return parseFloat((((total- usoIdle) / total) * 100).toFixed(2)); //toFixed(2) para limitar a 2 decimales
}

function obtenerUsoMemoria() {
    const memTotal = os.totalmem()/(1024**3); // en GB
    const memLibre = os.freemem()/(1024**3);
    const memUsada = memTotal - memLibre;
    const porcentajeUsada = (memUsada / memTotal) * 100;
    return porcentajeUsada.toFixed(2);
}

function obtenerTiempoSistema() {
    const tiempoSistemaSegundos = os.uptime();
    return (tiempoSistemaSegundos/60).toFixed(2); // en minutos
}

function obtenerTiempoNode() {
    const tiempoActual = Date.now();
    const tiempoNodeSegundos = (tiempoActual - inicioNode) / 1000;
    return (tiempoNodeSegundos/60).toFixed(2); // en minutos
}

function mostrarInfo() {
    console.log("===== INFORMACIÓN DEL SISTEMA =====");
    if (config.mostrarCPU) console.log(`Uso de CPU: ${obtenerUsoCPU()} %`);
    if (config.mostrarMemoria) console.log(`Uso de Memoria: ${obtenerUsoMemoria()} %`);
    if (config.mostrarTiempoSistema) console.log(`Tiempo de actividad del sistema: ${obtenerTiempoSistema()} minutos`);
    if (config.mostrarTiempoNode) console.log(`Tiempo desde el inicio de Node.js: ${obtenerTiempoNode()} minutos`);
    console.log("===================================");
}

setInterval(mostrarInfo, config.intervaloSegundos * 1000); //Establecer intervalo de tiempo para mostrar la info

//Crear servidor HTTP básico
const server = http.createServer((req, res)=>{
    res.end("Servidor Node.js funcionando correctamente");
});

server.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});

