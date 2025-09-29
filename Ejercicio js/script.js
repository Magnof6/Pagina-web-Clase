//const diccionario = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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



//Funcion para generar letra random
function letraRandom() {
    const index = Math.floor(Math.random()*diccionario.length);
    //Math.floor redondea un numero decimal hacia abajo
    return diccionario[index];
}
//Función para generar contraseña repitiendo palabras
function generarPassword(){
    const length = document.getElementById("length").value;
    let password = "";
    for (let i = 0; i < length; i++){
        password += letraRandom();
    }
    document.getElementById("result").textContent = password;

}

//Evento click generar contraseña
document.getElementById("generate").addEventListener("click", generarPassword);

//Generar sin Repetir Palabras
function generarPasswordNoRepeat(){
    const length = parseInt(document.getElementById("length").value); 
    //Nos aseguramos que length es numero entero
    let copiaDiccionario = [...diccionario];
    //Hacemos una copia del diccionario original
    let password = "";
    if (length > copiaDiccionario.length){
        alert("No hay suficientes palabras en el diccionario2");
        return;
    }
    for (let i = 0; i < length; i++){
        const index = Math.floor(Math.random()*copiaDiccionario.length);
        password += copiaDiccionario[index];
        copiaDiccionario.splice(index, 1);
        //Eliminamos la palabra del diccionario para que no se repita
    }
    document.getElementById("result").textContent = password;
}

document.getElementById("generateNoRepeat").addEventListener("click", generarPasswordNoRepeat);