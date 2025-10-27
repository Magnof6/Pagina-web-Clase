require('dotenv').config();
const os = require('os');
const process = require('process');
const http = require('http');

console.log("SERVIDOR NODE.JS INICIADO CON LA SIGUIENTE CONFIGURACIÓN:");
console.log(`Versión de Node.js: ${process.version}`);
console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
console.log(`Arquitectura: ${os.arch()}`);
console.log(`Host: ${os.hostname()}`);
console.log(`CPU: ${os.cpus()[0].model}`);
console.log("===============================");

function usoCPU() {
    const t = os.cpus().map(c => c.times);
    const total = t.reduce((a, b) => a + b.user + b.sys + b.idle + b.nice + b.irq, 0);
    const idle = t.reduce((a, b) => a + b.idle, 0);
    return ((1 - idle / total) * 100).toFixed(2);
};
function mostrarInfo() {
    console.log("===== INFORMACIÓN DEL SISTEMA =====");
    console.log(`Uso de CPU:${usoCPU()}%`);//
    console.log('Uso de Memoria:',((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2),'%');
    console.log('Tiempo de actividad del sistema:',(os.uptime()/60).toFixed(2),'segundos');
    console.log('Tiempo de actividad del proceso Node.js:',process.uptime().toFixed(2),'segundos');
    console.log("===================================");
}

setInterval( mostrarInfo, 5000); // Mostrar info cada 10 segundos