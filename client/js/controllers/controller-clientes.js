import { crearFormCliente } from "../components/form.js";

export function initClienteController() {
    const botonesEditar = document.querySelectorAll("#tabla-clientes .btn-editar-cliente");
    const botonesEliminar = document.querySelectorAll("#tabla-clientes .btn-eliminar-cliente");
    const botonFiltros = document.querySelector("#btn-filtros-clientes");

    // Acción Editar → abre formulario cliente
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", () => {
            abrirFormularioCliente();
        });
    });

    // Acción Eliminar → confirmación
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            abrirConfirmacionEliminarCliente(id);
        });
    });

    // Acción Filtros
    if (botonFiltros) {
        botonFiltros.addEventListener("click", () => {
            alert("Aquí abrís el modal de filtros para clientes (ejemplo).");
        });
    }
}

// ---- Abrir formulario cliente ----
function abrirFormularioCliente() {
    const modal = document.createElement("div");
    modal.id = "modal-cliente";
    modal.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";

    const container = document.createElement("div");
    container.className = "relative bg-slate-800/90 rounded-lg shadow-lg border border-white/10 w-full max-w-3xl";

    const btnClose = document.createElement("button");
    btnClose.innerHTML = "<i class='bx bx-x text-xl'></i>";
    btnClose.className = "absolute top-3 right-3 text-white hover:text-red-400 transition";
    btnClose.addEventListener("click", () => abrirConfirmacionCerrarCliente());

    const formCliente = crearFormCliente();

    container.appendChild(btnClose);
    container.appendChild(formCliente);
    modal.appendChild(container);
    document.body.appendChild(modal);

    asignarAccionesFormularioCliente(formCliente);
}

function asignarAccionesFormularioCliente(formCliente) {
    const btnGuardar = formCliente.querySelector("button[type='submit']");
    const btnCancelar = formCliente.querySelector("button[type='reset']");
    const btnCerrar = formCliente.querySelector("#cerrar-form-cliente");

    btnGuardar.addEventListener("click", (e) => {
        e.preventDefault();
        // Aquí capturás los datos del cliente antes de cerrar
        const cliente = {
            cuit: formCliente.querySelector("#cliente-cuit").value,
            razonSocial: formCliente.querySelector("#cliente-razonSocial").value,
            correo: formCliente.querySelector("#cliente-correo").value,
            direccion: formCliente.querySelector("#cliente-direccion").value
        };
        console.log("Cliente guardado:", cliente);
        cerrarFormularioCliente();
    });

    btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        abrirConfirmacionCerrarCliente();
    });

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => abrirConfirmacionCerrarCliente());
    }
}

// ---- Confirmación Cerrar ----
function abrirConfirmacionCerrarCliente() {
    if (document.getElementById("confirmCloseClienteModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmCloseClienteModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cerrar formulario</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres cerrar el formulario de cliente? Se perderán los datos no guardados.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarCerrarCliente" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarCerrarCliente" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarCerrarCliente").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarCerrarCliente").addEventListener("click", () => {
        confirmModal.remove();
        cerrarFormularioCliente();
    });
}

// ---- Confirmación Eliminar ----
function abrirConfirmacionEliminarCliente(id) {
    if (document.getElementById("confirmDeleteClienteModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmDeleteClienteModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Eliminar cliente</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres eliminar el cliente con ID <b>${id}</b>? Esta acción no se puede deshacer.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarEliminarCliente" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarEliminarCliente" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Eliminar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarEliminarCliente").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarEliminarCliente").addEventListener("click", () => {
        confirmModal.remove();
        alert(`Cliente con ID ${id} eliminado (ejemplo). Aquí conectás tu API para borrar en la BD.`);
    });
}

// ---- Cerrar formulario cliente ----
function cerrarFormularioCliente() {
    const modal = document.getElementById("modal-cliente");
    if (modal) modal.remove();
}
