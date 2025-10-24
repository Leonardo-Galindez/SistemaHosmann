import { crearFormPartes } from "../components/forms.js";

export let page = 1;
export const limit = 10;
let filtrosActivos = {};
export let partesActuales = [];

function escapeHTML(str) {
    if (str === null || str === undefined) return "-";
    return str.toString().replace(/[&<>"']/g, (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[m]));
}

export async function fetchAndRenderPartes(filtros = {}) {
    if (Object.keys(filtros).length > 0) {
        filtrosActivos = filtros;
        page = 1;
    }

    const { cliente = "", estado = "", fechaInicio = "", fechaFin = "" } = filtrosActivos;
    const params = new URLSearchParams({ page, limit });

    if (cliente) params.append("cliente", cliente);
    if (estado) params.append("estado", estado);
    if (fechaInicio) params.append("fechaInicio", fechaInicio);
    if (fechaFin) params.append("fechaFin", fechaFin);

    const section = document.getElementById("tabla-partes");
    const tbody = document.getElementById("tablaPartes");

    if (!section || !tbody) {
        console.error("No se encontró el contenedor de la tabla de partes.");
        return;
    }

    try {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-white py-4">Cargando...</td></tr>`;

        const response = await fetch(
            `https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_partes.php?${params.toString()}`,
            {
                credentials: 'include'
            }
        );

        const result = await response.json();

        if (!result.success) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">${escapeHTML(result.message ?? "Error al cargar los partes.")}</td></tr>`;
            return;
        }

        const partes = result.data;
        const usuario = result.user?.toLowerCase() ?? "desconocido";
        const esAdmin = usuario === "administracion" || usuario === "cliente";

        partesActuales = partes;

        if (!partes || partes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-white text-center py-4">No hay partes registrados.</td></tr>`;
            return;
        }

        tbody.innerHTML = partes.map((p) => {
            let estadoColor = "bg-yellow-600 hover:bg-yellow-700";
            let iconoColor = "text-yellow-400";
            if (p.estado === "APROBADO") {
                estadoColor = "bg-green-600 hover:bg-green-700";
                iconoColor = "text-green-400";
            } else if (p.estado === "DESAPROBADO") {
                estadoColor = "bg-red-600 hover:bg-red-700";
                iconoColor = "text-red-400";
            }

            // --- Botones según tipo de usuario ---
            let botonesHTML = "";
            console.log(esAdmin);
            if (!esAdmin) {
                botonesHTML += `
                    <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar" title="Editar">
                        <i class='bx bx-pencil'></i>
                    </button>
                    <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar" title="Eliminar">
                        <i class='bx bx-trash'></i>
                    </button>
                    <button class="px-2 py-1 text-xs rounded text-white transition flex items-center btn-estado ${estadoColor}" 
                            data-estado="${escapeHTML(p.estado ?? 'PENDIENTE')}"
                            title="Cambiar estado">
                        <i class='bx bx-check-shield ${iconoColor}'></i>
                    </button>
                `;
            }

            // --- Botón Ver PDF (siempre visible) ---
            if (p.pdf) {
                botonesHTML += `
                    <button class="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition flex items-center btn-ver-pdf" data-id="${escapeHTML(p.idRespuesta)}" title="Ver PDF">
                        <i class='bx bx-file'></i>
                    </button>
                `;
            }

            return `
            <tr class="fila-parte cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${escapeHTML(p.nroParte)}">
                <td class="px-4 py-2 text-center">${escapeHTML(p.nroParte)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(p.fecha_formateada ?? p.fecha)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(p.lugar)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(p.ejecutante)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(p.equipo)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(p.kmRecorridos ?? 0)}</td>
                <td class="px-4 py-2">
                    <div class="flex justify-center gap-2 acciones">
                        ${botonesHTML}
                    </div>
                </td>
            </tr>
            <tr class="fila-detalle hidden bg-slate-700/40">
                <td colspan="7" class="px-6 py-4 text-sm">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-200 text-xs md:text-sm">
                        <p><b>ID Respuesta:</b> ${escapeHTML(p.idRespuesta)}</p>
                        <p><b>Tipo Equipo:</b> ${escapeHTML(p.tipoEquipo)}</p>
                        <p><b>Litros Gasoil:</b> ${escapeHTML(p.ltsgasoil ?? 0)}</p>
                        <p><b>Cantidad Viajes:</b> ${escapeHTML(p.cantidadViajes ?? 0)}</p>
                        <p><b>Día:</b> ${escapeHTML(p.dia)}</p>
                        <p><b>Cliente:</b> ${escapeHTML(p.cliente)}</p>
                        <p><b>Descripción:</b> ${escapeHTML(p.descripcion)}</p>
                        <p><b>Hora Inicio:</b> ${escapeHTML(p.horaInicio)}</p>
                        <p><b>Hora Fin:</b> ${escapeHTML(p.horaFin)}</p>
                        <p><b>Cantidad Horas:</b> ${escapeHTML(p.cantidadHoras ?? 0)}</p>
                        <p><b>Observaciones:</b> ${escapeHTML(p.observaciones)}</p>
                        <p><b>Km Repaso:</b> ${escapeHTML(p.kmRepaso ?? 0)}</p>
                        <p><b>Estado:</b> <span class="estado-parte">${escapeHTML(p.estado ?? "PENDIENTE")}</span></p>
                        <p><b>PDF:</b> ${p.pdf ? "Sí" : "No"}</p>
                        <p class="col-span-full"><b>Detalle:</b> ${escapeHTML(p.detalle)}</p>
                    </div>
                </td>
            </tr>
            `;
        }).join("");

        // --- Paginación ---
        section.querySelector(".paginacion")?.remove();
        const paginacionHTML = `
            <div class="paginacion flex justify-center items-center gap-4 mt-4">
                <button id="btn-prev" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${page <= 1 ? "opacity-50 cursor-not-allowed" : ""}">
                    Anterior
                </button>
                <span class="text-white text-sm">Página ${result.currentPage} de ${result.totalPages}</span>
                <button id="btn-next" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${page >= result.totalPages ? "opacity-50 cursor-not-allowed" : ""}">
                    Siguiente
                </button>
            </div>
        `;
        section.insertAdjacentHTML("beforeend", paginacionHTML);

        // --- Mostrar/ocultar detalles ---
        const filas = tbody.querySelectorAll(".fila-parte");
        filas.forEach(fila => {
            fila.addEventListener("click", (e) => {
                if (e.target.closest(".btn-editar, .btn-eliminar, .btn-estado, .btn-ver-pdf")) return;
                const detalle = fila.nextElementSibling;
                if (detalle) detalle.classList.toggle("hidden");
            });
        });

        // --- Paginación eventos ---
        document.getElementById("btn-prev")?.addEventListener("click", () => {
            if (page > 1) {
                page--;
                fetchAndRenderPartes();
            }
        });
        document.getElementById("btn-next")?.addEventListener("click", () => {
            if (page < result.totalPages) {
                page++;
                fetchAndRenderPartes();
            }
        });

        // --- Evitar propagación en botones ---
        section.querySelectorAll(".btn-editar, .btn-eliminar, .btn-estado, .btn-ver-pdf")
            .forEach(btn => btn.addEventListener("click", e => e.stopPropagation()));

        // === Ver PDF ===
        section.querySelectorAll(".btn-ver-pdf").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                e.stopPropagation();
                const idRespuesta = btn.dataset.id;
                console.log("Ver PDF para ID Respuesta:", idRespuesta);
                try {
                    const res = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_archivo.php?idRespuesta=${idRespuesta}`);
                    const data = await res.json();

                    if (!data.success) {
                        alert(data.message || "No se encontró el archivo PDF.");
                        return;
                    }

                    mostrarModalPDF(data.url, data.nombreArchivo);
                } catch (err) {
                    console.error("Error al obtener PDF:", err);
                    alert("Error al obtener el archivo PDF.");
                }
            });
        });

        // === Función para mostrar el modal PDF ===
        function mostrarModalPDF(url, nombreArchivo) {
            const modal = document.createElement("div");
            modal.className = "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50";

            modal.innerHTML = `
                <div class="bg-slate-800 rounded-xl shadow-lg border border-white/10 w-[90%] md:w-[70%] h-[80%] flex flex-col">
                    <div class="flex justify-between items-center px-4 py-2 border-b border-white/10">
                        <h2 class="text-lg text-white font-semibold">Archivo: ${nombreArchivo}</h2>
                        <button class="text-white hover:text-red-400 text-xl font-bold" id="cerrar-modal-pdf">&times;</button>
                    </div>
                    <div class="flex-1 bg-slate-900 overflow-hidden">
                        <iframe src="${url}" class="w-full h-full rounded-b-xl" frameborder="0"></iframe>
                    </div>
                    <div class="p-3 flex justify-end bg-slate-900 border-t border-white/10">
                        <a href="${url}" download="${nombreArchivo}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition">
                            Descargar PDF
                        </a>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            document.getElementById("cerrar-modal-pdf").addEventListener("click", () => modal.remove());
        }

    } catch (error) {
        console.error("Error al obtener los partes:", error);
        tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">Error al conectar con el servidor.</td></tr>`;
    }

    renderControllerTabla();
}



export function renderControllerTabla() {
    const botonesEditar = document.querySelectorAll(".btn-editar");
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    const botonesEstado = document.querySelectorAll(".btn-estado");

    // === Editar ===
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (id) abrirFormulario(id);
            else console.warn("No se encontró el ID del parte al intentar editar.");
        });
    });

    // === Eliminar ===
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (id) abrirConfirmacionEliminar(id);
            else console.warn("No se encontró el ID del parte al intentar eliminar.");
        });
    });

    // === Cambiar Estado (Ciclo con color dinámico) ===
    botonesEstado.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();

            const fila = btn.closest("tr");
            const id = fila.dataset.id;
            const icono = btn.querySelector("i");

            let estadoActual = btn.dataset.estado?.toUpperCase() || "PENDIENTE";
            let nuevoEstado, colorClaseBtn, iconoColor;

            // Ciclo de estados
            switch (estadoActual) {
                case "PENDIENTE":
                    nuevoEstado = "APROBADO";
                    colorClaseBtn = "bg-green-600 hover:bg-green-700";
                    iconoColor = "text-green-400";
                    break;
                case "APROBADO":
                    nuevoEstado = "DESAPROBADO";
                    colorClaseBtn = "bg-red-600 hover:bg-red-700";
                    iconoColor = "text-red-400";
                    break;
                default:
                    nuevoEstado = "PENDIENTE";
                    colorClaseBtn = "bg-yellow-600 hover:bg-yellow-700";
                    iconoColor = "text-yellow-400";
                    break;
            }

            // Actualizar visualmente el botón
            btn.dataset.estado = nuevoEstado;
            btn.className = `px-2 py-1 text-xs rounded text-white transition flex items-center btn-estado ${colorClaseBtn}`;
            icono.className = `bx bx-check-shield ${iconoColor}`;

            // Actualizar celda de detalle si existe
            const celdaEstado = fila.nextElementSibling?.querySelector(".estado-parte");
            if (celdaEstado) {
                celdaEstado.textContent = nuevoEstado;
                celdaEstado.classList.remove("text-green-500", "text-red-500", "text-yellow-500");
                if (nuevoEstado === "APROBADO") celdaEstado.classList.add("text-green-500");
                else if (nuevoEstado === "DESAPROBADO") celdaEstado.classList.add("text-red-500");
                else celdaEstado.classList.add("text-yellow-500");
            }

            // === Enviar cambio al backend ===
            try {
                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/update_estado_parte.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, estado: nuevoEstado })
                });

                const result = await response.json();

                if (result.success) {
                    mostrarAlerta(`Parte ${nuevoEstado.toLowerCase()} correctamente`, nuevoEstado);
                } else {
                    console.error("Error al actualizar estado:", result.error);
                    mostrarAlerta("No se pudo actualizar el estado. Intenta nuevamente.", "error");
                }
            } catch (error) {
                console.error("Error de conexión al actualizar estado:", error);
                mostrarAlerta("Error de conexión con el servidor.", "error");
            }
        });
    });
}

function mostrarAlerta(mensaje, tipo = "info") {
    const alerta = document.createElement("div");
    let color = "bg-slate-700";

    if (tipo === "APROBADO") color = "bg-green-600";
    else if (tipo === "DESAPROBADO") color = "bg-red-600";
    else if (tipo === "error") color = "bg-red-700";
    else if (tipo === "PENDIENTE") color = "bg-yellow-600";

    alerta.className = `${color} text-white px-4 py-2 rounded shadow-lg fixed top-5 right-5 z-50 animate-fadeIn`;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.add("animate-fadeOut");
        setTimeout(() => alerta.remove(), 300);
    }, 2000);
}


function abrirFormulario(remitoId = null) {
    const modal = document.createElement("div");
    modal.id = "modal-remito";
    modal.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";

    const container = document.createElement("div");
    container.className = "relative bg-slate-800/90 rounded-lg shadow-lg border border-white/10 w-full max-w-5xl";

    const btnClose = document.createElement("button");
    btnClose.innerHTML = "<i class='bx bx-x text-xl'></i>";
    btnClose.className = "absolute top-3 right-3 text-white hover:text-red-400 transition";
    btnClose.addEventListener("click", () => abrirConfirmacionCerrar());

    const formRemito = crearFormPartes();

    container.appendChild(btnClose);
    container.appendChild(formRemito);
    modal.appendChild(container);
    document.body.appendChild(modal);

    asignarAccionesFormulario(formRemito);

    if (remitoId) {
        mostrarLoader("Cargando datos del parte...");
        fetch_parte(remitoId)
            .finally(() => ocultarLoader());
    }
}


function asignarAccionesFormulario(formRemito) {
    const btnActualizar = formRemito.querySelector("button[type='submit']");
    const btnCancelar = formRemito.querySelector("button[type='reset']");
    const btnCerrar = formRemito.querySelector("#cerrar-form");

    btnActualizar.addEventListener("click", async (e) => {
        e.preventDefault();
        await actualizarParte(formRemito.querySelector("form"));
        cerrarFormulario();
    });

    btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        abrirConfirmacionCerrar();
    });

    btnCerrar.addEventListener("click", () => abrirConfirmacionCerrar());
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

async function abrirConfirmacionEliminar(id) {
    if (document.getElementById("confirmDeleteModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmDeleteModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full animate-fadeIn">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Eliminar parte</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
                ¿Seguro que quieres eliminar el parte con ID <b>${id}</b>? 
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
            const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/delete_parte.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            const result = await response.json();

            if (result.success) {
                // Eliminar la fila de la tabla visualmente
                document.querySelector(`tr[data-id="${id}"]`)?.remove();

                // Mensaje visual de confirmación
                const aviso = document.createElement("div");
                aviso.className = "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
                aviso.textContent = "✅ Parte eliminado correctamente";
                document.body.appendChild(aviso);
                setTimeout(() => aviso.remove(), 2500);

            } else {
                alert("❌ Error al eliminar: " + (result.error || "Intenta nuevamente."));
                console.error(result);
            }

        } catch (error) {
            console.error("Error al eliminar el parte:", error);
            alert("⚠️ Error inesperado al eliminar el parte.");
        }
    });
}

function cerrarFormulario() {
    const modal = document.getElementById("modal-remito");
    if (modal) modal.remove();
}


export async function fetch_parte(remitoId) {
    try {

        const response = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_parte.php?id=${remitoId}`);
        if (!response.ok) throw new Error("Error al obtener los datos del parte");


        const data = await response.json();

        if (data.error) {
            console.error("Backend:", data.error);
            return;
        }


        const form = document.querySelector("#form-remito form");
        if (!form) {
            console.error("No se encontró el formulario en el DOM");
            return;
        }


        Object.entries(data).forEach(([key, value]) => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                // Si es textarea o input, se maneja igual
                input.value = value ?? "";
            }
        });


    } catch (error) {
        console.error("Error al cargar el parte:", error);
    }
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

// 🔹 Oculta el loader
function ocultarLoader() {
    const loader = document.getElementById("loader-overlay");
    if (loader) loader.remove();
}

// 🔹 Tu función principal con loader integrado
export async function actualizarParte(form) {
    try {
        // Mostrar loader al comenzar la actualización
        mostrarLoader("Actualizando parte...");

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/update_parte.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Ocultar loader cuando llega respuesta
        ocultarLoader();

        if (result.success) {
            cerrarFormulario();

            const aviso = document.createElement("div");
            aviso.className = "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
            aviso.textContent = "✅ Parte actualizado correctamente";
            document.body.appendChild(aviso);
            setTimeout(() => aviso.remove(), 2500);

        } else {
            const avisoError = document.createElement("div");
            avisoError.className = "fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
            avisoError.textContent = "❌ Error al actualizar: " + (result.error || "Intenta nuevamente");
            document.body.appendChild(avisoError);
            setTimeout(() => avisoError.remove(), 3000);

            console.error(result);
        }
    } catch (error) {
        ocultarLoader(); // asegúrate de quitar el loader si hay error
        console.error("Error al enviar actualización:", error);

        const avisoError = document.createElement("div");
        avisoError.className = "fixed bottom-5 right-5 bg-yellow-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
        avisoError.textContent = "⚠️ Error inesperado al actualizar el parte.";
        document.body.appendChild(avisoError);
        setTimeout(() => avisoError.remove(), 3000);
    }
}
