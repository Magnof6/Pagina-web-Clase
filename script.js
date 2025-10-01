//Para abrir y cerrar el menú lateral

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    function closeSidebarOnClickOutside(event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }

    toggleButton.addEventListener('click', toggleSidebar);
    document.addEventListener('click', closeSidebarOnClickOutside);
});
