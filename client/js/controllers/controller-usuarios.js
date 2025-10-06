import { crearFormUsuario } from "../components/form.js";

export function initUsuarioControllerUsuario() {
    const botonesEditar = document.querySelectorAll("#tabla-usuarios .btn-editar-usuario");
    const botonesEliminar = document.querySelectorAll("#tabla-usuarios .btn-eliminar-usuario");
    const botonFiltros = document.querySelector("#btn-filtros-usuarios");

    // Acción Editar → abre formulario usuario
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("hgola")
            abrirFormularioUsuario();
        });
    });

    // Acción Eliminar → confirmación
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            abrirConfirmacionEliminarUsuario(id);
        });
    });

    // Acción Filtros
    if (botonFiltros) {
        botonFiltros.addEventListener("click", () => {
            alert("Aquí abrís el modal de filtros para usuarios (ejemplo).");
        });
    }
}

// ---- Abrir formulario usuario ----
function abrirFormularioUsuario() {
    const modal = document.createElement("div");
    modal.id = "modal-usuario";
    modal.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";

    const container = document.createElement("div");
    container.className = "relative bg-slate-800/90 rounded-lg shadow-lg border border-white/10 w-full max-w-3xl";

    const btnClose = document.createElement("button");
    btnClose.innerHTML = "<i class='bx bx-x text-xl'></i>";
    btnClose.className = "absolute top-3 right-3 text-white hover:text-red-400 transition";
    btnClose.addEventListener("click", () => abrirConfirmacionCerrarUsuario());

    const formUsuario = crearFormUsuario();

    container.appendChild(btnClose);
    container.appendChild(formUsuario);
    modal.appendChild(container);
    document.body.appendChild(modal);

    asignarAccionesFormularioUsuario(formUsuario);
}

function asignarAccionesFormularioUsuario(formUsuario) {
    const btnGuardar = formUsuario.querySelector("button[type='submit']");
    const btnCancelar = formUsuario.querySelector("button[type='reset']");
    const btnCerrar = formUsuario.querySelector("#cerrar-form-usuario");

    btnGuardar.addEventListener("click", (e) => {
        e.preventDefault();
        // Aquí validás contraseñas antes de cerrar
        const pass = formUsuario.querySelector("#password").value;
        const pass2 = formUsuario.querySelector("#password2").value;
        const error = formUsuario.querySelector("#password-error");
        if (pass !== pass2) {
            error.classList.remove("hidden");
            return;
        }
        error.classList.add("hidden");
        cerrarFormularioUsuario();
    });

    btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        abrirConfirmacionCerrarUsuario();
    });

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => abrirConfirmacionCerrarUsuario());
    }
}

// ---- Confirmación Cerrar ----
function abrirConfirmacionCerrarUsuario() {
    if (document.getElementById("confirmCloseUsuarioModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmCloseUsuarioModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cerrar formulario</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres cerrar el formulario de usuario? Se perderán los datos no guardados.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarCerrarUsuario" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarCerrarUsuario" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarCerrarUsuario").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarCerrarUsuario").addEventListener("click", () => {
        confirmModal.remove();
        cerrarFormularioUsuario();
    });
}

// ---- Confirmación Eliminar ----
function abrirConfirmacionEliminarUsuario(id) {
    if (document.getElementById("confirmDeleteUsuarioModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmDeleteUsuarioModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Eliminar usuario</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres eliminar el usuario con ID <b>${id}</b>? Esta acción no se puede deshacer.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarEliminarUsuario" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover-bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarEliminarUsuario" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Eliminar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarEliminarUsuario").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarEliminarUsuario").addEventListener("click", () => {
        confirmModal.remove();
        alert(`Usuario con ID ${id} eliminado (ejemplo). Aquí conectás tu API para borrar en la BD.`);
    });
}

// ---- Cerrar formulario usuario ----
function cerrarFormularioUsuario() {
    const modal = document.getElementById("modal-usuario");
    if (modal) modal.remove();
}


