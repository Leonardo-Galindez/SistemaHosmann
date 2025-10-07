import { crearNavbar } from "../components/nav.js";
import { crearPanelPartes, crearPanelClientes, crearPanelUsuarios } from "../components/paneles.js";
import { crearFooter } from "../components/footer.js";
import { crearTablaClientes, crearTablaPartes, crearTablaUsuarios } from "../components/tablas.js";
import { fetchAndRenderPartes } from "./controller-tabla-partes.js";
import { renderControllerFiltros } from "./controller-filtros.js";

document.addEventListener('DOMContentLoaded', () => {
    crearNavbar();
    crearPanelPartes();
    crearPanelClientes();
    crearPanelUsuarios();

    crearTablaPartes();
    renderControllerFiltros();
    crearTablaClientes();
    crearTablaUsuarios();

    fetchAndRenderPartes();

    crearFooter();
});
