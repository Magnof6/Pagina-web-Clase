$(document).ready(() => {
    //Formulario escondido al principio
    $('#formContainer').hide();
    //mostrar formulario
    $('#registerBtn').click(() =>{
        $('#mainContent').hide(); //ocultar contenido principal
        $('#formContainer').fadeIn(); //Muestra elemento con ejecto fade
        $('#success').text(""); //Limpia mensaje de exito
        $('#registerForm')[0].reset(); //Limpia formulario
        $('#error').text(""); //Limpia mensaje de error
    });
    //Botón cancelar
    $('#cancelBtn').click(() =>{
        $('#formContainer').hide(); //ocultar formulario
        $('#mainContent').fadeIn(); //Muestra contenido principal
        $('#error').text(""); //Limpia mensaje de error
    });

    //validar formulario

    $('#registerForm').submit(function(e) {
        e.preventDefault();
        let valid = true;

        //limpiar errores
        $('.error').text('');
        $('#success').text('');

        //obtener valores

        const nombre = $('#nombre').val();  //val devuelve el valor del primer elemento
        //trim elimina los espacios
        const email = $('#email').val().trim();
        const telefono = $('#telefono').val().trim();
        const password = $('#password').val().trim();
        
        //validar nombre
        const valNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/;
        /*
            '/.../' son los delimitadores de la expresion
            '^' marca el inicio de la cadena
            '$' marca el final de la cadena
            [] indica un conjunto de caractéres válidos
            A-za-z de la A a la Z mayúscula y minúscula, tambien se incluye después letras
            con acentos y eñes.
            + indica una o más repeticiones "empieza una paralbra que tenga una o más letras"
            \s+ --> al menos un espacio en blanco que separe las palabras
            El + de después del segundo corchete indica que se puede repetir
            una o más veces el caracter anterior, en este caso el conjunto de letras
        */
        if (!valNombre.test(nombre)){
            $('#errorNombre').text('Debe incluir al menos nombre y apellido, solo letras.');
            valid = false;
        }

        //validar email
        const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        /*
            Dentro de los corchetes:
            '^' niega el conjunto, todo lo que venga despues no sirve (dentro del corchete)
            @ lo exige(el que está fuera de los corchetes)
            '\.' significa un punto, si ponemos el punto sin la barra significa cualquier carácter
        */
        if (!valEmail.test(email)){
            $('#errorEmail').text('Introduzca un correo válido');
            valid = false;
        }

        //validar telefono
        const valNum = /^[0-9]+$/
        if (!valNum.test(telefono)){
            $('#errorTelefono').text('El télefono solo debe contener números');
            valid = false;
        }

        //validar contraseña
        const valPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
        /*
            (?=.*[a-z])
                '?=' --> debe cumplirse lo siguiente
                '.*' --> cualquier caracter, cualquier cantidad de veces
                [a-z]--> al menos una minuscula
            debe contener al menos una minuscula en cualquier posición

            (?=.*\d)
                '\d' --> un digito numérico
                '.*'--> en cualquier posición
            .{8,}
                '.' --> cualquier carácter
                '{8,}'--> al menos 8 veces {min,max}
        */
        if(!valPass.test(password)){
            $('#errorPassword').text('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
            valid = false;
        }

        //Si todo es valido
        if(valid == true){
            $('#success').text('Registro completado correctamente!!');
            $('#registerForm')[0].reset();
        }
    });

});

