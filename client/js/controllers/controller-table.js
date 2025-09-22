import { crearFormUpdate } from "../components/form-update.js";
import { crearFormFiltros } from "../components/form-filtros.js";

export function initRemitoController() {
    const botonesEditar = document.querySelectorAll("button[title='Editar']");
    const botonesEliminar = document.querySelectorAll("button[title='Eliminar']");
    const botonFiltros = document.querySelector("#btn-filtros");

    // Acción Editar → abre formulario
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", () => {
            abrirFormulario();
        });
    });

    // Acción Eliminar
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // evitar expandir fila
            const id = btn.closest("tr").dataset.id;
            abrirConfirmacionEliminar(id);
        });
    });

    // Acción Filtros
    if (botonFiltros) {
        botonFiltros.addEventListener("click", () => {
            abrirFiltros();
        });
    }
}

function abrirFormulario() {
    const modal = document.createElement("div");
    modal.id = "modal-remito";
    modal.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";

    const container = document.createElement("div");
    container.className = "relative bg-slate-800/90 rounded-lg shadow-lg border border-white/10 w-full max-w-5xl";

    const btnClose = document.createElement("button");
    btnClose.innerHTML = "<i class='bx bx-x text-xl'></i>";
    btnClose.className = "absolute top-3 right-3 text-white hover:text-red-400 transition";
    btnClose.addEventListener("click", () => abrirConfirmacionCerrar());

    const formRemito = crearFormUpdate();

    container.appendChild(btnClose);
    container.appendChild(formRemito);
    modal.appendChild(container);
    document.body.appendChild(modal);

    asignarAccionesFormulario(formRemito);
}

function asignarAccionesFormulario(formRemito) {
    const btnActualizar = formRemito.querySelector("button[type='submit']");
    const btnCancelar = formRemito.querySelector("button[type='reset']");
    const btnCerrar = formRemito.querySelector("#cerrar-form");

    btnActualizar.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarFormulario();
    });

    btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        abrirConfirmacionCerrar();
    });

    btnCerrar.addEventListener("click", () => abrirConfirmacionCerrar());
}

function abrirFiltros() {
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

    btnAplicar.addEventListener("click", (e) => {
        e.preventDefault();
        const cliente = formFiltros.querySelector("#filtro-cliente").value;
        const fechaInicio = formFiltros.querySelector("#filtro-fecha-inicio").value;
        const fechaFin = formFiltros.querySelector("#filtro-fecha-fin").value;
        cerrarFiltros();
    });

    btnLimpiar.addEventListener("click", () => {
        formFiltros.reset();
    });

    btnCancelar.addEventListener("click", () => {
        cerrarFiltros();
    });

    btnCerrar.addEventListener("click", () => {
        cerrarFiltros();
    });
}

function cerrarFiltros() {
    const modal = document.getElementById("modal-filtros");
    if (modal) modal.remove();
}


function abrirConfirmacionCerrar() {
    if (document.getElementById("confirmCloseModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmCloseModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cerrar formulario</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres cerrar el formulario? Se perderán los datos no guardados.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarCerrarForm" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarCerrarForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarCerrarForm").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarCerrarForm").addEventListener("click", () => {
        confirmModal.remove();
        cerrarFormulario();
    });
}

function abrirConfirmacionEliminar(id) {
    if (document.getElementById("confirmDeleteModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmDeleteModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Eliminar parte</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres eliminar el parte con ID <b>${id}</b>? Esta acción no se puede deshacer.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarEliminar" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarEliminar" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Eliminar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarEliminar").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarEliminar").addEventListener("click", () => {
        confirmModal.remove();
        alert(`Parte con ID ${id} eliminado (ejemplo). Aquí conectás tu API para borrar en la BD.`);
    });
}

function cerrarFormulario() {
    const modal = document.getElementById("modal-remito");
    if (modal) modal.remove();
}
