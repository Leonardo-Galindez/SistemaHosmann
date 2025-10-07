import { fetchAndRenderPartes } from "./controller-tabla-partes.js";
import { crearFormFiltros } from "../components/forms.js";

export function renderControllerFiltros() {
    const botonFiltros = document.querySelector("#btn-filtros");

    if (botonFiltros) {
        botonFiltros.addEventListener("click", () => {
            abrirFiltros();
        });
    }

}

export function abrirFiltros() {
    const modal = document.createElement("div");
    modal.id = "modal-filtros";
    modal.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";

    const container = document.createElement("div");
    container.className = "relative bg-slate-800/90 rounded-lg shadow-lg border border-white/10 w-full max-w-lg";

    const formFiltros = crearFormFiltros();
    container.appendChild(formFiltros);
    modal.appendChild(container);
    document.body.appendChild(modal);

    asignarAccionesFiltros(formFiltros);
}

function asignarAccionesFiltros(formFiltros) {
    const btnAplicar = formFiltros.querySelector("#btn-aplicar");
    const btnLimpiar = formFiltros.querySelector("#btn-limpiar");
    const btnCancelar = formFiltros.querySelector("#btn-cancelar");
    const btnCerrar = formFiltros.querySelector("#cerrar-filtros");

    btnAplicar.addEventListener("click", async (e) => {
        e.preventDefault();

        const cliente = formFiltros.querySelector("#filtro-cliente").value.trim();
        const estado = formFiltros.querySelector("#filtro-estado").value || "";
        const fechaInicio = formFiltros.querySelector("#filtro-fecha-inicio").value;
        const fechaFin = formFiltros.querySelector("#filtro-fecha-fin").value;

        window.page = 1;

        await fetchAndRenderPartes({ cliente, estado, fechaInicio, fechaFin });
        cerrarFiltros();
    });

    btnLimpiar.addEventListener("click", async () => {

        formFiltros.querySelector("#filtro-cliente").value = "";
        formFiltros.querySelector("#filtro-estado").value = "";
        formFiltros.querySelector("#filtro-fecha-inicio").value = "";
        formFiltros.querySelector("#filtro-fecha-fin").value = "";

    });

    btnCancelar.addEventListener("click", cerrarFiltros);
    btnCerrar.addEventListener("click", cerrarFiltros);
}

function cerrarFiltros() {
    const modal = document.getElementById("modal-filtros");
    if (modal) modal.remove();
}