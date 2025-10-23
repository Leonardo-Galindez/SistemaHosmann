import { crearNavbar } from "../components/nav.js";
import { crearPanelPartes, crearPanelClientes, crearPanelUsuarios, crearPanelDashboard } from "../components/paneles.js";
import { crearFooter } from "../components/footer.js";
import { crearTablaClientes, crearTablaPartes, crearTablaUsuarios, crearTablaDashboard } from "../components/tablas.js";
import { fetchAndRenderPartes } from "./controller-tabla-partes.js";
import { renderControllerFiltros } from "./controller-filtros.js";
import { renderControllerDescargar } from "./controller-reporte.js";
import { renderControllerUsuarios } from "./controller-usuarios.js";
import { fetchAndRenderUsuarios } from "./controller-tabla-usuarios.js";
import { fetchAndRenderClientes } from "./controller-tabla-clientes.js";
import {
    crearComponenteChartGasoil,
    crearComponenteChartHuellaTorta,
    crearComponenteChartMotoniveladora,
    crearGraficosPartesPorTipo,
    crearComponenteChartCisterna
} from "../components/charts.js";


document.addEventListener('DOMContentLoaded', () => {
    // === Estructura general del panel ===
    crearNavbar();
    crearPanelPartes();
    crearPanelClientes();
    crearPanelUsuarios();
    crearPanelDashboard();
    crearTablaPartes();
    crearTablaClientes();
    crearTablaUsuarios();
    crearTablaDashboard();
    crearFooter();

    renderControllerUsuarios();
    renderControllerFiltros();
    fetchAndRenderPartes();
    fetchAndRenderUsuarios();
    fetchAndRenderClientes();
    renderControllerDescargar();

    crearGraficosPartesPorTipo();
    crearComponenteChartGasoil();
    crearComponenteChartHuellaTorta();
    crearComponenteChartMotoniveladora();
    crearComponenteChartCisterna();
});
