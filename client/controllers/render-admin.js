import { crearNavbar } from "../components/nav.js";
import { crearPanelPartes,crearPanelClientes,crearPanelUsuarios } from "../components/paneles.js";
import { crearFooter } from "../components/footer.js";
import { crearTablaClientes, crearTablaPartes, crearTablaUsuarios } from "../components/tablas.js";

document.addEventListener('DOMContentLoaded', () => {
    crearNavbar();
    crearPanelPartes();
    crearPanelClientes();
    crearPanelUsuarios();
    crearTablaPartes();
    crearTablaClientes();
    crearTablaUsuarios();
    crearFooter();
});