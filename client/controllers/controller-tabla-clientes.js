import { crearFormUpdateCliente } from "../components/forms.js";

let clientesActuales = [];
let pageClientes = 1;
const limitClientes = 10;

export async function fetchAndRenderClientes(filtros = {}) {
    const { razonSocial = "" } = filtros;
    const params = new URLSearchParams({ page: pageClientes, limit: limitClientes });

    if (razonSocial) params.append("razonSocial", razonSocial);


    const section = document.getElementById("tabla-clientes");
    const tbody = document.getElementById("tablaClientes");

    if (!section || !tbody) {
        console.error("No se encontró el contenedor de la tabla de clientes.");
        return;
    }

    try {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-white py-4">Cargando clientes...</td></tr>`;

        const response = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_clientes.php?${params.toString()}`);
        const result = await response.json();

        if (!result.success) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">${escapeHTML(result.message ?? "Error al cargar los clientes.")}</td></tr>`;
            return;
        }

        const clientes = result.data;
        clientesActuales = clientes;

        if (!clientes || clientes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-white text-center py-4">No hay clientes registrados.</td></tr>`;
            return;
        }

        // === Renderizar filas ===
        tbody.innerHTML = clientes.map((c) => `
            <tr class="cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${escapeHTML(c.id)}">
                <td class="px-4 py-2 text-center">${escapeHTML(c.id)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(c.cuit)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(c.razonSocial)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(c.correo ?? "-")}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(c.direccion)}</td>
                <td class="px-4 py-2">
                    <div class="flex justify-center gap-2">
                        <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar-cliente" title="Editar cliente">
                            <i class='bx bx-pencil'></i>
                        </button>
                        <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar-cliente" title="Eliminar cliente">
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
                <button id="btn-prev-client" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${pageClientes <= 1 ? "opacity-50 cursor-not-allowed" : ""}">
                    Anterior
                </button>
                <span class="text-white text-sm">Página ${result.currentPage} de ${result.totalPages}</span>
                <button id="btn-next-client" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${pageClientes >= result.totalPages ? "opacity-50 cursor-not-allowed" : ""}">
                    Siguiente
                </button>
            </div>
        `;
        section.insertAdjacentHTML("beforeend", paginacionHTML);

        // Controladores de paginación
        document.getElementById("btn-prev-client")?.addEventListener("click", () => {
            if (pageClientes > 1) {
                pageClientes--;
                fetchAndRenderClientes();
            }
        });

        document.getElementById("btn-next-client")?.addEventListener("click", () => {
            if (pageClientes < result.totalPages) {
                pageClientes++;
                fetchAndRenderClientes();
            }
        });

        // Controladores de acción
        renderControllerClientes();

    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">Error al conectar con el servidor.</td></tr>`;
    }
}


// === Controladores de acciones ===
export function renderControllerClientes() {
    const botonesEditar = document.querySelectorAll(".btn-editar-cliente");
    const botonesEliminar = document.querySelectorAll(".btn-eliminar-cliente");

    // === Editar cliente ===
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (id) updateCliente(id);
        });
    });

    // === Eliminar cliente ===
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (!id) return;

            // Abrir modal de confirmación
            abrirConfirmacionEliminarCliente(id);
        });
    });

    // === Modal de confirmación de eliminación ===
    async function abrirConfirmacionEliminarCliente(id) {
        if (document.getElementById("confirmDeleteModal")) return;

        const confirmModal = document.createElement("div");
        confirmModal.id = "confirmDeleteModal";
        confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

        confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full animate-fadeIn">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Eliminar cliente</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
                ¿Seguro que quieres eliminar el cliente con ID <b>${id}</b>? 
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

                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/delete_cliente.php", {
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
                    aviso.textContent = "✅ Cliente eliminado correctamente";
                    document.body.appendChild(aviso);
                    setTimeout(() => aviso.remove(), 2500);

                    // Refrescar lista (opcional)
                    if (typeof fetchAndRenderClientes === "function") fetchAndRenderClientes();

                } else {
                    alert("⚠️ " + (result.message || "Error al eliminar cliente."));
                }

            } catch (error) {
                console.error("Error al eliminar cliente:", error);
                alert("⚠️ Error de conexión con el servidor.");
            }
        });
    }

}


function escapeHTML(str) {
    if (str === null || str === undefined) return "";
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

export async function updateCliente(id) {
    try {
        mostrarLoader("Cargando datos del cliente...");

        const res = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_cliente.php?id=${id}`);
        const data = await res.json();

        ocultarLoader();

        if (!data.success) {
            mostrarAviso("error", "❌ Error al cargar datos del cliente.");
            return;
        }

        const cliente = data.cliente;
        const form = crearFormUpdateCliente();

        document.body.appendChild(form);

        // Precargar valores en el formulario
        form.querySelector("#cliente-id").value = cliente.id;
        form.querySelector("#cliente-razonSocial").value = cliente.razonSocial;
        form.querySelector("#cliente-cuit").value = cliente.cuit;
        form.querySelector("#cliente-correo").value = cliente.correo || "";
        form.querySelector("#cliente-direccion").value = cliente.direccion;


        // === Botones de cerrar / cancelar ===
        const btnCerrar = form.querySelector("#cerrar-form-cliente");
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

            const formData = new FormData(form);

            try {
                mostrarLoader("Actualizando cliente...");

                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/update_cliente.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                ocultarLoader();

                if (result.success) {
                    form.remove();
                    fetchAndRenderClientes();
                    mostrarAviso("success", "✅ Cliente actualizado correctamente.");
                } else {
                    mostrarAviso("error", "❌ " + (result.message || "Error al actualizar cliente."));
                }
            } catch (err) {
                ocultarLoader();
                console.error("Error en la actualización:", err);
                mostrarAviso("warning", "⚠️ Error al conectar con el servidor.");
            }
        });

    } catch (error) {
        ocultarLoader();
        console.error("Error al obtener cliente:", error);
        mostrarAviso("error", "❌ Error al cargar datos del cliente.");
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