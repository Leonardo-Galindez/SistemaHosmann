import { crearFormUpdateUsuario } from "../components/forms.js";

let usuariosActuales = [];
let pageUsuarios = 1;
const limitUsuarios = 10;

export async function fetchAndRenderUsuarios(filtros = {}) {
    const { nombre = "", correo = "", tipo = "" } = filtros;
    const params = new URLSearchParams({ page: pageUsuarios, limit: limitUsuarios });

    if (nombre) params.append("nombre", nombre);
    if (correo) params.append("correo", correo);
    if (tipo) params.append("tipo", tipo);

    const section = document.getElementById("tabla-usuarios");
    const tbody = document.getElementById("tablaUsuarios");

    if (!section || !tbody) {
        console.error("No se encontró el contenedor de la tabla de usuarios.");
        return;
    }

    try {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-white py-4">Cargando usuarios...</td></tr>`;

        const response = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_usuarios.php?${params.toString()}`);
        const result = await response.json();

        if (!result.success) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">${escapeHTML(result.message ?? "Error al cargar los usuarios.")}</td></tr>`;
            return;
        }

        const usuarios = result.data;
        usuariosActuales = usuarios;

        if (!usuarios || usuarios.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-white text-center py-4">No hay usuarios registrados.</td></tr>`;
            return;
        }

        // === Renderizar filas ===
        tbody.innerHTML = usuarios.map((u) => `
            <tr class="cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${escapeHTML(u.id)}">
                <td class="px-4 py-2 text-center">${escapeHTML(u.id)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.nombre)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.apellido)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.telefono ?? "-")}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.correo)}</td>
                <td class="px-4 py-2 text-center capitalize">${escapeHTML(u.tipo)}</td>
                <td class="px-4 py-2">
                    <div class="flex justify-center gap-2">
                        <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar-usuario" title="Editar usuario">
                            <i class='bx bx-pencil'></i>
                        </button>
                        <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar-usuario" title="Eliminar usuario">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");

        // === Paginación ===
        section.querySelector(".paginacion")?.remove();
        const paginacionHTML = `
            <div class="paginacion flex justify-center items-center gap-4 mt-4">
                <button id="btn-prev-user" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${pageUsuarios <= 1 ? "opacity-50 cursor-not-allowed" : ""}">
                    Anterior
                </button>
                <span class="text-white text-sm">Página ${result.currentPage} de ${result.totalPages}</span>
                <button id="btn-next-user" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${pageUsuarios >= result.totalPages ? "opacity-50 cursor-not-allowed" : ""}">
                    Siguiente
                </button>
            </div>
        `;
        section.insertAdjacentHTML("beforeend", paginacionHTML);

        // Controladores de paginación
        document.getElementById("btn-prev-user")?.addEventListener("click", () => {
            if (pageUsuarios > 1) {
                pageUsuarios--;
                fetchAndRenderUsuarios();
            }
        });

        document.getElementById("btn-next-user")?.addEventListener("click", () => {
            if (pageUsuarios < result.totalPages) {
                pageUsuarios++;
                fetchAndRenderUsuarios();
            }
        });

        // Controladores de acción
        renderControllerUsuarios();

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">Error al conectar con el servidor.</td></tr>`;
    }
}


// === Controladores de acciones ===
export function renderControllerUsuarios() {
    const botonesEditar = document.querySelectorAll(".btn-editar-usuario");
    const botonesEliminar = document.querySelectorAll(".btn-eliminar-usuario");

    // === Editar usuario ===
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (id) updateUsuario(id);
        });
    });

    // === Eliminar usuario ===
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (!id) return;

            // Abrir modal de confirmación
            abrirConfirmacionEliminarUsuario(id);
        });
    });

    // === Modal de confirmación de eliminación ===
    async function abrirConfirmacionEliminarUsuario(id) {
        if (document.getElementById("confirmDeleteModal")) return;

        const confirmModal = document.createElement("div");
        confirmModal.id = "confirmDeleteModal";
        confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

        confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full animate-fadeIn">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Eliminar usuario</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
                ¿Seguro que quieres eliminar el usuario con ID <b>${id}</b>? 
                <br><span class="text-red-500 text-sm">Esta acción no se puede deshacer.</span>
            </p>
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

        // Botón cancelar
        confirmModal.querySelector("#cancelarEliminar").addEventListener("click", () => {
            confirmModal.remove();
        });

        // Botón confirmar
        confirmModal.querySelector("#confirmarEliminar").addEventListener("click", async () => {
            confirmModal.remove();

            try {
                const formData = new FormData();
                formData.append("id", id);

                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/delete_usuario.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Eliminar la fila visualmente
                    document.querySelector(`tr[data-id="${id}"]`)?.remove();

                    // Mensaje visual de confirmación
                    const aviso = document.createElement("div");
                    aviso.className = "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
                    aviso.textContent = "✅ Usuario eliminado correctamente";
                    document.body.appendChild(aviso);
                    setTimeout(() => aviso.remove(), 2500);

                    // Refrescar lista (opcional)
                    if (typeof fetchAndRenderUsuarios === "function") fetchAndRenderUsuarios();

                } else {
                    alert("⚠️ " + (result.message || "Error al eliminar usuario."));
                }

            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("⚠️ Error de conexión con el servidor.");
            }
        });
    }

}


// === Función auxiliar para evitar XSS ===
function escapeHTML(str = "") {
    return str
        .toString()
        .replace(/[&<>'"]/g, (tag) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        }[tag]));
}

function mostrarAviso(tipo = "info", mensaje = "") {
    const colores = {
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-600"
    };

    const aviso = document.createElement("div");
    aviso.className = `fixed bottom-5 right-5 ${colores[tipo] || "bg-blue-600"} text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50`;
    aviso.textContent = mensaje;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 3000);
}

export async function updateUsuario(id) {
    try {
        mostrarLoader("Cargando datos del usuario...");

        const res = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_usuario.php?id=${id}`);
        const data = await res.json();

        ocultarLoader();

        if (!data.success) {
            mostrarAviso("error", "❌ Error al cargar datos del usuario.");
            return;
        }

        const usuario = data.usuario;
        const form = crearFormUpdateUsuario();

        document.body.appendChild(form);

        // Precargar valores en el formulario
        form.querySelector("#usuario-id").value = usuario.id;
        form.querySelector("#usuario-nombre").value = usuario.nombre;
        form.querySelector("#usuario-apellido").value = usuario.apellido;
        form.querySelector("#usuario-razonSocial").value = usuario.razonSocial || "";
        form.querySelector("#usuario-telefono").value = usuario.telefono || "";
        form.querySelector("#usuario-correo").value = usuario.correo;
        form.querySelector("#usuario-tipo").value = usuario.tipo;

        // === Botones de cerrar / cancelar ===
        const btnCerrar = form.querySelector("#cerrar-form-usuario");
        const btnCancelar = form.querySelector("#cancelar-update");

        btnCerrar.addEventListener("click", (e) => {
            e.preventDefault();
            abrirConfirmacionCerrar(form);
        });

        btnCancelar.addEventListener("click", (e) => {
            e.preventDefault();
            abrirConfirmacionCerrar(form);
        });

        // === Envío del formulario ===
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const pass = form.querySelector("#password").value;
            const pass2 = form.querySelector("#password2").value;
            const error = form.querySelector("#password-error");

            if (pass !== pass2) {
                error.classList.remove("hidden");
                return;
            } else {
                error.classList.add("hidden");
            }

            const formData = new FormData(form);

            try {
                mostrarLoader("Actualizando usuario...");

                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/update_usuario.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                ocultarLoader();

                if (result.success) {
                    form.remove();
                    fetchAndRenderUsuarios();
                    mostrarAviso("success", "✅ Usuario actualizado correctamente.");
                } else {
                    mostrarAviso("error", "❌ " + (result.message || "Error al actualizar usuario."));
                }
            } catch (err) {
                ocultarLoader();
                console.error("Error en la actualización:", err);
                mostrarAviso("warning", "⚠️ Error al conectar con el servidor.");
            }
        });

    } catch (error) {
        ocultarLoader();
        console.error("Error al obtener usuario:", error);
        mostrarAviso("error", "❌ Error al cargar datos del usuario.");
    }
}

function abrirConfirmacionCerrar(form) {
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
        form.remove();
    });
}



function mostrarLoader(mensaje = "Procesando...") {
    if (document.getElementById("loader-overlay")) return; // evita duplicados

    const loader = document.createElement("div");
    loader.id = "loader-overlay";
    loader.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="flex flex-col items-center">
                <div class="loader-circle w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                <p class="text-white font-medium mt-3">${mensaje}</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}


function ocultarLoader() {
    const loader = document.getElementById("loader-overlay");
    if (loader) loader.remove();
}