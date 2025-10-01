//Para abrir y cerrar el menú lateral

document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded espera a que se cargue el HTML
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');

    function toggleSidebar() {
        sidebar.classList.toggle('active');

        if(sidebar.classList.contains('active')){
            toggleButton.textContent = '✖'; // Cambia el icono a una "X" cuando el sidebar está abierto
        }else{
            toggleButton.textContent = '☰'; // Cambia el icono a "☰" cuando el sidebar está cerrado
        }

    }

    function closeSidebarOnClickOutside(event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove('active');
            toggleButton.textContent = '☰'; // Cambia el icono a "☰" cuando el sidebar está cerrado
        } //Si el click no es ni en el sidebar ni en el botón, cierro el sidebar
    }

    toggleButton.addEventListener('click', toggleSidebar);
    document.addEventListener('click', closeSidebarOnClickOutside);
});
// toggleButton.addEventListener('click', () => toggleSidebar(sidebar));
//
// Explicación:
// () => {...} es una "función flecha" en JavaScript.
// Significa: "cuando ocurra el click, ejecuta esta función anónima".
// En este caso, la función anónima llama a toggleSidebar(sidebar).
//
// No se puede hacer toggleButton.addEventListener('click', toggleSidebar(sidebar)) directamente,
// porque eso ejecutaría toggleSidebar inmediatamente al asignar el listener,
// en lugar de esperar al click.
// La función flecha sirve para "envolver" la llamada y ejecutarla solo al hacer click.



// Espera a que cargue todo el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los elementos <dt> que abren submenus
    const submenuToggles = document.querySelectorAll('.toggle-submenu');

    submenuToggles.forEach(dt => {
        dt.addEventListener('click', (event) => {
            event.preventDefault(); // Evita recargar la página

            // nextElementSibling será el <dd> correspondiente
            const submenu = dt.nextElementSibling;

            // Comprobamos que realmente exista y sea la sublista
            if (submenu && submenu.classList.contains('sublist')) {
                submenu.classList.toggle('active'); // Mostrar u ocultar
                dt.classList.toggle('open'); // Cambiar el icono de la flecha
            }
        });
    });
});
