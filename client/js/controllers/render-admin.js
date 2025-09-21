import { crearNavbar } from '../components/nav.js';
import { crearPanel } from "../components/panel.js";
import { crearTabla } from "../components/tabla.js";
import { crearFooter } from "../components/footer.js";
// importar el controlador
import { initRemitoController } from "../controllers/controller-table.js";

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    const mainContainer = document.getElementById("main");

    // Navbar
    nav.appendChild(crearNavbar());

    // Main
    const main = document.createElement("main");
    main.className = "flex flex-col flex-1 pt-20 px-6 w-[90%] mx-auto gap-8";

    mainContainer.appendChild(main);

    // Secciones dentro del main
    main.appendChild(crearPanel());
    main.appendChild(crearTabla());
    main.appendChild(crearFooter());

    initRemitoController();
});
