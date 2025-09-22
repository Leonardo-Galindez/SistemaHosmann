import { crearNavbar } from '../components/nav.js';

// Partes
import { crearPanel } from "../components/panel.js";
import { crearTabla } from "../components/tabla.js";

// Usuarios
import { crearUsuarios } from "../components/panel.js";  
import { crearTablaUsuarios } from "../components/tabla.js";

// Clientes
import { crearClientes } from "../components/panel.js";
import { crearTablaClientes } from "../components/tabla.js";

// Footer y controlador
import { crearFooter } from "../components/footer.js";
import { initRemitoController } from "../controllers/controller-table.js";
import { initUsuarioControllerUsuario } from "../controllers/controller-usuarios.js";

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    const mainContainer = document.getElementById("main");

    // Navbar
    nav.appendChild(crearNavbar());

    // Main
    const main = document.createElement("main");
    main.className = "flex flex-col flex-1 pt-20 px-6 w-[90%] mx-auto gap-8";
    mainContainer.appendChild(main);

    // --- Secciones ---
    // Partes
    const panelPartes = crearPanel();
    const tablaPartes = crearTabla();

    // Usuarios
    const panelUsuarios = crearUsuarios();
    const tablaUsuarios = crearTablaUsuarios();

    // Clientes
    const panelClientes = crearClientes();
    const tablaClientes = crearTablaClientes();

    // Agregar al DOM
    main.appendChild(panelPartes);
    main.appendChild(tablaPartes);
    main.appendChild(panelUsuarios);
    main.appendChild(tablaUsuarios);
    main.appendChild(panelClientes);
    main.appendChild(tablaClientes);
    main.appendChild(crearFooter());

    // Ocultar al inicio usuarios y clientes
    panelUsuarios.classList.add("hidden");
    tablaUsuarios.classList.add("hidden");
    panelClientes.classList.add("hidden");
    tablaClientes.classList.add("hidden");

    initRemitoController();
    initUsuarioControllerUsuario();

    // ---- Función genérica para mostrar secciones ----
    function mostrarSeccion(seccion) {
        const todas = [
            { panel: panelPartes, tabla: tablaPartes },
            { panel: panelUsuarios, tabla: tablaUsuarios },
            { panel: panelClientes, tabla: tablaClientes }
        ];

        // Ocultar todas
        todas.forEach(({ panel, tabla }) => {
            panel.classList.add("hidden");
            tabla.classList.add("hidden");
        });

        // Mostrar solo la seleccionada
        if (seccion === "partes") {
            panelPartes.classList.remove("hidden");
            tablaPartes.classList.remove("hidden");
        } else if (seccion === "usuarios") {
            panelUsuarios.classList.remove("hidden");
            tablaUsuarios.classList.remove("hidden");
        } else if (seccion === "clientes") {
            panelClientes.classList.remove("hidden");
            tablaClientes.classList.remove("hidden");
        }
    }

    // ---- Navegación ----
    document.querySelector("a[href='#usuarios']").addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion("usuarios");
    });

    document.querySelector("a[href='#partes']").addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion("partes");
    });

    document.querySelector("a[href='#clientes']").addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion("clientes");
    });
});
