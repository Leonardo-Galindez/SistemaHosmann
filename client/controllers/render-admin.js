import { crearNavbar } from "../components/nav.js";
import { crearPanelPartes, crearPanelClientes, crearPanelUsuarios, crearPanelDashboard } from "../components/paneles.js";
import { crearFooter } from "../components/footer.js";
import { crearTablaClientes, crearTablaPartes, crearTablaUsuarios, crearTablaDashboard  } from "../components/tablas.js";
import { fetchAndRenderPartes } from "./controller-tabla-partes.js";
import { renderControllerFiltros } from "./controller-filtros.js";
import { renderControllerDescargar } from "./controller-reporte.js";

document.addEventListener('DOMContentLoaded', () => {
    crearNavbar();
    crearPanelPartes();
    crearPanelClientes();
    crearPanelUsuarios();
    crearPanelDashboard();
    crearTablaPartes();
    renderControllerFiltros();
    crearTablaClientes();
    crearTablaUsuarios();
    crearTablaDashboard();
    fetchAndRenderPartes();
    renderControllerDescargar();
    crearFooter();
});
