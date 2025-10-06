import { crearFormUpdate } from "../components/form.js";
import { crearFormFiltros } from "../components/form-filtros.js";

export function initRemitoController() {
    const botonesEditar = document.querySelectorAll(".btn-editar");
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    const botonesEstado = document.querySelectorAll(".btn-estado");
    const botonFiltros = document.querySelector("#btn-filtros");

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
                const response = await fetch("https://smartform.com.ar/hosmann/administracion/server/backend/modules/update_estado_parte.php", {
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

    // === Filtros ===
    if (botonFiltros) {
        botonFiltros.addEventListener("click", () => {
            abrirFiltros();
        });
    }
}

/**
 * Muestra una alerta temporal en pantalla.
 */
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

    const formRemito = crearFormUpdate();

    container.appendChild(btnClose);
    container.appendChild(formRemito);
    modal.appendChild(container);
    document.body.appendChild(modal);

    asignarAccionesFormulario(formRemito);
    if (remitoId) {
        fetch_parte(remitoId);
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
        const estado = formFiltros.querySelector("#filtro-estado")?.value || "";
        const fechaInicio = formFiltros.querySelector("#filtro-fecha-inicio").value;
        const fechaFin = formFiltros.querySelector("#filtro-fecha-fin").value;

        // Llamamos a la tabla con filtros
        const nuevaTabla = await crearTabla(1, 10, { cliente, estado, fechaInicio, fechaFin });
        document.querySelector("main").appendChild(nuevaTabla);
        initRemitoController();
        cerrarFiltros();
    });

    // Botón limpiar → restaura la tabla completa sin filtros
    btnLimpiar.addEventListener("click", async () => {
        formFiltros.reset();

        const tablaExistente = document.querySelector("#main-table");
        if (tablaExistente) tablaExistente.remove();

        const tablaCompleta = await crearTabla(1, 10);
        const panelPartes = document.querySelector("#panel-partes");
        if (panelPartes) {
            panelPartes.insertAdjacentElement("afterend", tablaCompleta);
        } else {
            document.querySelector("main").appendChild(tablaCompleta);
        }

        initRemitoController();
    });

    btnCancelar.addEventListener("click", cerrarFiltros);
    btnCerrar.addEventListener("click", cerrarFiltros);
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
            const response = await fetch("https://smartform.com.ar/hosmann/administracion/server/backend/delete_parte.php", {
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

        const response = await fetch(`https://smartform.com.ar/hosmann/administracion/server/backend/modules/fetch_parte.php?id=${remitoId}`);
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

export async function actualizarParte(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("https://smartform.com.ar/hosmann/administracion/server/backend/update_parte.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            cerrarFormulario();

            // ✅ Mensaje visual de éxito
            const aviso = document.createElement("div");
            aviso.className = "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
            aviso.textContent = "✅ Parte actualizado correctamente";
            document.body.appendChild(aviso);
            setTimeout(() => aviso.remove(), 2500);

        } else {
            // ❌ Mensaje visual de error
            const avisoError = document.createElement("div");
            avisoError.className = "fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
            avisoError.textContent = "❌ Error al actualizar: " + (result.error || "Intenta nuevamente");
            document.body.appendChild(avisoError);
            setTimeout(() => avisoError.remove(), 3000);

            console.error(result);
        }
    } catch (error) {
        console.error("Error al enviar actualización:", error);

        // ⚠️ Error inesperado
        const avisoError = document.createElement("div");
        avisoError.className = "fixed bottom-5 right-5 bg-yellow-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn";
        avisoError.textContent = "⚠️ Error inesperado al actualizar el parte.";
        document.body.appendChild(avisoError);
        setTimeout(() => avisoError.remove(), 3000);
    }
}
