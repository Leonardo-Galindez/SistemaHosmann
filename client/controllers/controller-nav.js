

document.addEventListener('DOMContentLoaded', () => {
    // Función para mostrar una sección y ocultar las demás
    function mostrarSeccion(seccion) {
        const secciones = [
            { panel: 'panel-partes', tabla: 'tabla-partes' },
            { panel: 'panel-clientes', tabla: 'tabla-clientes' },
            { panel: 'panel-usuarios', tabla: 'tabla-usuarios' },
            { panel: 'panel-dashboard', tabla: 'tabla-dashboard' }

        ];

        // Ocultar todas las secciones
        secciones.forEach(({ panel, tabla }) => {
            const panelEl = document.getElementById(panel);
            const tablaEl = document.getElementById(tabla);
            if (panelEl) panelEl.classList.add('hidden');
            if (tablaEl) tablaEl.classList.add('hidden');
        });

        // Mostrar solo la sección elegida
        const panelActivo = document.getElementById(`panel-${seccion}`);
        const tablaActiva = document.getElementById(`tabla-${seccion}`);

        if (panelActivo) panelActivo.classList.remove('hidden');
        if (tablaActiva) tablaActiva.classList.remove('hidden');
    }

    // Delegación de eventos para los links del navbar
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('a[href="#partes"]')) {
            event.preventDefault();
            mostrarSeccion('partes');
        }

        if (target.closest('a[href="#clientes"]')) {
            event.preventDefault();
            mostrarSeccion('clientes');
        }

        if (target.closest('a[href="#usuarios"]')) {
            event.preventDefault();
            mostrarSeccion('usuarios');
        }

        if (target.closest('a[href="#dashboard"]')) {
            event.preventDefault();
            mostrarSeccion('dashboard');
        }
    });

    // Mostrar "Partes" por defecto al cargar
    mostrarSeccion('partes');
});
