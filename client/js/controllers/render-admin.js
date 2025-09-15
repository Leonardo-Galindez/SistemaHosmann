
import { crearNavbar } from '../components/nav.js';

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.appendChild(crearNavbar());
});
