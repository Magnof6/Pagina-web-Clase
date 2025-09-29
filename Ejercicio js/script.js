const diccionario = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//Funcion para generar letra random
function letraRandom() {
    const index = Math.floor(Math.random()*diccionario.length);
    //Math.floor redondea un numero decimal hacia abajo
    return diccionario[index];
}
//Función para generar contraseña
function generarPassword(){
    const legth = document.getElementById("length").value;
    let password = "";
    for (let i = 0; i < legth; i++){
        password += letraRandom();
    }
    document.getElementById("result").textContent = password;

}

//Evento click
document.getElementById("generate").addEventListener("click", generarPassword);