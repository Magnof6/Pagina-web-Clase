require('dotenv').config();
const http = require('http');
const url = require('url');
const port =  process.env.port || 3000;
const diccionario = [
    "Amor", "Bosque", "Casa", "Delfín", "Estrella", "Fuego", "Gato", "Hombre",
    "Isla", "Jardín", "Koala", "Luz", "Montaña", "Nube", "Oceano", "Piedra",
    "Quimera", "Río", "Sol", "Trueno", "Universo", "Viento", "Whisky", "Xilófono",
    "Yate", "Zorro", "Aurora", "Brisa", "Cielo", "Destino", "Esperanza", "Fortaleza",
    "Globo", "Horizonte", "Invierno", "Joya", "Karma", "Leyenda", "Magia", "Naturaleza",
    "Órbita", "Paraíso", "Quimera", "Recuerdo", "Silencio", "Tesoro", "Unidad", "Viaje",
    "Wonderland", "Zenit", "amor", "bosque", "casa", "delfín", "estrella", "fuego", "gato", "hombre",
    "isla", "jardín", "koala", "luz", "montaña", "nube", "oceano", "piedra",
    "quimera", "río", "sol", "trueno", "universo", "viento", "whisky", "xilófono",
    "yate", "zorro", "aurora", "brisa", "cielo", "destino", "esperanza", "fortaleza",
    "globo", "horizonte", "invierno", "joya", "karma", "leyenda", "magia", "naturaleza",
    "órbita", "paraíso", "quimera", "recuerdo", "silencio", "tesoro", "unidad", "viaje",
    "wonderland", "zenit"
];

function generarPassword(length){
    let password = "";
    for (let i = 0; i < length; i++){
        const index = Math.floor(Math.random()*diccionario.length);
        password += diccionario[index];
    }
    return password;
}
const server = http.createServer((req, res) => {
    const query = url.parse(req.url,true).query;
    const passwordLength = parseInt(query.x)||4; // Número de palabras en la contraseña
    const password = generarPassword(passwordLength);
    res.setHeader('Content-Type','text/html; charset=UTF-8');
    res.end(`<h1>Contraseña Generada</h1>
            <p><strong>${password}</strong></p>
            <p>Generada con ${passwordLength} palabra(s).</p>
            <p>Ejemplo: <a href="/?x=6">Generar con 6 palabras</a></p>`);
    });
server.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
