import { crearNavbar } from "../components/nav.js";
import { crearPanelPartes,crearPanelClientes,crearPanelUsuarios } from "../components/paneles.js";


document.addEventListener('DOMContentLoaded', () => {
    crearNavbar();
    crearPanelPartes();
    crearPanelClientes();
    crearPanelUsuarios();
});