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
import { initClienteController } from "../controllers/controller-clientes.js";

document.addEventListener("DOMContentLoaded", async () => {
    const nav = document.getElementById("nav");
    const mainContainer = document.getElementById("main");

    // Navbar
    nav.appendChild(crearNavbar());

    // Main
    const main = document.createElement("main");
    main.className = "flex flex-col flex-1 pt-20 px-6 w-[90%] mx-auto gap-8";
    mainContainer.appendChild(main);

    // --- Secciones ---
    const panelPartes = crearPanel();
    let tablaPartes = await crearTabla();

    const panelUsuarios = crearUsuarios();
    const tablaUsuarios = crearTablaUsuarios();

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
    initClienteController();

    document.addEventListener("tablaPartesActualizada", (e) => {
        tablaPartes = e.detail; // actualizar referencia a la nueva tabla
    });

    async function mostrarSeccion(seccion) {
        const todas = [
            { panel: panelPartes, tabla: tablaPartes },
            { panel: panelUsuarios, tabla: tablaUsuarios },
            { panel: panelClientes, tabla: tablaClientes }
        ];

        // Ocultar todas las secciones
        todas.forEach(({ panel, tabla }) => {
            panel.classList.add("hidden");
            tabla.classList.add("hidden");
        });

        document.querySelectorAll("#modal-remito, #modal-filtros, #confirmDeleteModal, #confirmCloseModal")
            .forEach(el => el.remove());

        // Mostrar solo la sección seleccionada
        if (seccion === "partes") {
            panelPartes.classList.remove("hidden");

            const tablaExistente = document.querySelector("#main-table");
            if (tablaExistente) tablaExistente.remove();

            // Crear y agregar la nueva tabla
            tablaPartes = await crearTabla();
            panelPartes.insertAdjacentElement("afterend", tablaPartes);
            initRemitoController();
        }
        else if (seccion === "usuarios") {
            panelUsuarios.classList.remove("hidden");
            tablaUsuarios.classList.remove("hidden");
        } else if (seccion === "clientes") {
            panelClientes.classList.remove("hidden");
            tablaClientes.classList.remove("hidden");
        }
    }

    // ---- Navegación ----
    document.querySelectorAll("a[href='#usuarios']").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarSeccion("usuarios");
            document.getElementById("mobileMenu")?.classList.add("hidden");
        });
    });

    document.querySelectorAll("a[href='#partes']").forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            await mostrarSeccion("partes");
            document.getElementById("mobileMenu")?.classList.add("hidden");
        });
    });

    document.querySelectorAll("a[href='#clientes']").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarSeccion("clientes");
            document.getElementById("mobileMenu")?.classList.add("hidden");
        });
    });

});
