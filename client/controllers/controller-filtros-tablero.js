import { crearFormFiltrosTablero } from "../components/forms.js";
// Si luego usas una función para actualizar datos del tablero, por ejemplo:
import { crearGraficosPartesPorTipo, crearComponenteChartHuellaTorta, crearComponenteChartMotoniveladora, crearComponenteChartCisterna } from "../components/charts.js";

export function renderControllerFiltrosTablero() {
    const botonFiltros = document.querySelector("#btn-filtros-tablero");

    if (botonFiltros) {
        botonFiltros.addEventListener("click", () => {
            abrirFiltrosTablero();
        });
    }
}

export function abrirFiltrosTablero() {
    const modal = document.createElement("div");
    modal.id = "modal-filtros-tablero";
    modal.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";

    const formFiltrosTablero = crearFormFiltrosTablero();
    modal.appendChild(formFiltrosTablero);
    document.body.appendChild(modal);

    asignarAccionesFiltrosTablero(formFiltrosTablero);
}

function asignarAccionesFiltrosTablero(formFiltrosTablero) {
    const btnAplicar = formFiltrosTablero.querySelector("#btn-aplicar-tablero");
    const btnLimpiar = formFiltrosTablero.querySelector("#btn-limpiar-tablero");
    const btnCancelar = formFiltrosTablero.querySelector("#btn-cancelar-tablero");
    const btnCerrar = formFiltrosTablero.querySelector("#cerrar-filtros-tablero");

    // Aplicar filtros
    btnAplicar.addEventListener("click", async (e) => {
        e.preventDefault();

        const fechaInicio = formFiltrosTablero.querySelector("#filtro-fecha-inicio-tablero").value;
        const fechaFin = formFiltrosTablero.querySelector("#filtro-fecha-fin-tablero").value;

        // Aquí puedes pasar los filtros a tu función del tablero
        // Por ejemplo:
        await crearGraficosPartesPorTipo({ fechaInicio, fechaFin });
        await crearComponenteChartHuellaTorta({ fechaInicio, fechaFin });
        await crearComponenteChartMotoniveladora({ fechaInicio, fechaFin });
        await crearComponenteChartCisterna({ fechaInicio, fechaFin });

        cerrarFiltrosTablero();
    });

    // Limpiar campos
    btnLimpiar.addEventListener("click", () => {
        formFiltrosTablero.querySelector("#filtro-fecha-inicio-tablero").value = "";
        formFiltrosTablero.querySelector("#filtro-fecha-fin-tablero").value = "";
    });

    // Cancelar y cerrar modal
    btnCancelar.addEventListener("click", cerrarFiltrosTablero);
    btnCerrar.addEventListener("click", cerrarFiltrosTablero);
}

function cerrarFiltrosTablero() {
    const modal = document.getElementById("modal-filtros-tablero");
    if (modal) modal.remove();
}
