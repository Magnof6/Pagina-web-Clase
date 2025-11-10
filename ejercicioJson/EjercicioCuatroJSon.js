(function(){
    'use strict';
    const express = require('express'); //Se utiliza para crear el servidor web
    const axios = require('axios'); //Se utiliza para hacer solicitudes HTTP
    const cheerio = require('cheerio'); //Se utiliza para parsear HTML
    const cron = require('node-cron');//Se utiliza para programar tareas

    const app = express();
    const PORT = 3000;

    const url = 'https://books.toscrape.com/'; //URL del sitio web a scrapear'
    let ultimosLibros = []; //Variable para almacenar los datos scrapeados

    // Función para scrapear los datos del sitio web
    async function scrapearLibros() {
        try{
            const { data } = await axios.get(url); //Hacemos una solicitud GET a la URL
            const cheerioInstance= cheerio.load(data); //Cargamos el HTML en cheerio
            const libros = [];

            cheerioInstance('.product_pod').each((index, element) => {
                const titulo = cheerioInstance(element).find('h3 a').attr('title');
                const precio = cheerioInstance(element).find('.price_color').text();
                const disponibilidad = cheerioInstance(element).find('.availability').text().trim();
                libros.push({ titulo, precio, disponibilidad });
            });

            ultimosLibros = libros; //Actualizamos la variable con los datos scrapeados
            console.log(`[${new Date().toLocaleTimeString()}] ${libros.length} libros extraídos.`);
        }catch (error) {
            console.error('Error al scrapear los datos:', error.message);
        }
    }

    //Ejecutar la funcion inicialmente
    scrapearLibros();

    //Programar la tarea para ejecutarla cada minuto
    cron.schedule('*/1 * * * *', () => {
        console.log('Ejecutando tarea programada para scrapear libros...');
        scrapearLibros();
    });

    //Definir la ruta para obtener los datos scrapeados DOS formatos: HTML y JSON
    app.get('/', (req, res) => {
        let html = `
        <h1>📚 Libros extraídos de Books.toscrape.com</h1>
        <p>Última actualización: ${new Date().toLocaleTimeString()}</p>
        <table border="1" cellspacing="0" cellpadding="6">
        <tr><th>Título</th><th>Precio</th><th>Disponibilidad</th></tr>
        `;

        ultimosLibros.forEach(libro => {
            html += `
                <tr>
                    <td>${libro.titulo}</td>
                    <td>${libro.precio}</td>
                    <td>${libro.disponibilidad}</td>
                </tr>
            `;
        });

        html += '</table>';
        res.send(html);

    });

    app.get('/libros', (req, res) => {
        res.json(ultimosLibros);
    });

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

})();