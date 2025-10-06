import { initRemitoController } from "../controllers/controller-table.js";
import { initUsuarioControllerUsuario } from "../controllers/controller-usuarios.js";
import { initClienteController } from "../controllers/controller-clientes.js";

export async function crearTabla(page = 1, limit = 10, filtros = {}) {
    const section = document.createElement("section");
    section.id = "main-table";
    section.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";

    // --- Desestructurar los filtros opcionales ---
    const { cliente = "", estado = "", fechaInicio = "", fechaFin = "" } = filtros;

    try {
        // --- Construcción dinámica de la URL ---
        const params = new URLSearchParams({
            page,
            limit,
            empresa: cliente,
            estado,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin
        });

        const response = await fetch(`https://smartform.com.ar/hosmann/administracion/server/backend/modules/fetch_partes_filtros.php?${params.toString()}`);
        const result = await response.json();

        if (!result.success) {
            section.innerHTML = `<p class="text-red-500 text-center">${result.message}</p>`;
            return section;
        }

        const partes = result.data;
        if (!partes || partes.length === 0) {
            section.innerHTML = `<p class="text-white text-center">No hay partes registrados.</p>`;
            return section;
        }

        // === Tabla principal ===
        section.innerHTML = `
            <table class="w-full text-sm text-white border-collapse">
                <thead class="bg-slate-900/80 text-white uppercase text-xs tracking-wide">
                    <tr>
                        <th class="px-4 py-3 text-center">Nro Parte</th>
                        <th class="px-4 py-3 text-center">Fecha</th>
                        <th class="px-4 py-3 text-center">Cliente</th>
                        <th class="px-4 py-3 text-center">Ejecutante</th>
                        <th class="px-4 py-3 text-center">Equipo</th>
                        <th class="px-4 py-3 text-center">Km Recorridos</th>
                        <th class="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${partes.map((p) => {
                        // Color dinámico según estado
                        let estadoColor = "bg-yellow-600 hover:bg-yellow-700";
                        let iconoColor = "text-yellow-400";
                        if (p.estado === "APROBADO") {
                            estadoColor = "bg-green-600 hover:bg-green-700";
                            iconoColor = "text-green-400";
                        } else if (p.estado === "DESAPROBADO") {
                            estadoColor = "bg-red-600 hover:bg-red-700";
                            iconoColor = "text-red-400";
                        }

                        return `
                        <!-- Fila resumen -->
                        <tr class="fila-remito cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${p.nroParte}">
                            <td class="px-4 py-2 text-center">${p.nroParte ?? "-"}</td>
                            <td class="px-4 py-2 text-center">${p.fecha_formateada ?? p.fecha ?? "-"}</td>
                            <td class="px-4 py-2 text-center">${p.cliente ?? "-"}</td>
                            <td class="px-4 py-2 text-center">${p.ejecutante ?? "-"}</td>
                            <td class="px-4 py-2 text-center">${p.equipo ?? "-"}</td>
                            <td class="px-4 py-2 text-center">${p.kmRecorridos ?? 0}</td>
                            <td class="px-4 py-2 flex justify-center gap-2 acciones">
                                <td class="flex gap-1 justify-center">

                                    <!-- Editar -->
                                    <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar" title="Editar">
                                        <i class='bx bx-pencil'></i>
                                    </button>

                                    <!-- Eliminar -->
                                    <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar" title="Eliminar">
                                        <i class='bx bx-trash'></i>
                                    </button>

                                    <!-- Estado -->
                                    <button class="px-2 py-1 text-xs rounded text-white transition flex items-center btn-estado ${estadoColor}" 
                                            data-estado="${p.estado ?? 'PENDIENTE'}"
                                            title="Cambiar estado">
                                        <i class='bx bx-check-shield ${iconoColor}'></i>
                                    </button>
                                </td>
                            </td>
                        </tr>

                        <!-- Detalle -->
                        <tr class="fila-detalle hidden bg-slate-700/40">
                            <td colspan="7" class="px-6 py-4 text-sm">
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-200 text-xs md:text-sm">
                                    <p><b>ID Respuesta:</b> ${p.idRespuesta ?? "-"}</p>
                                    <p><b>Tipo Equipo:</b> ${p.tipoEquipo ?? "-"}</p>
                                    <p><b>Litros Gasoil:</b> ${p.ltsgasoil ?? 0}</p>
                                    <p><b>Cantidad Viajes:</b> ${p.cantidadViajes ?? 0}</p>
                                    <p><b>Día:</b> ${p.dia ?? "-"}</p>
                                    <p><b>Lugar:</b> ${p.lugar ?? "-"}</p>
                                    <p><b>Descripción:</b> ${p.descripcion ?? "-"}</p>
                                    <p><b>Hora Inicio:</b> ${p.horaInicio ?? "-"}</p>
                                    <p><b>Hora Fin:</b> ${p.horaFin ?? "-"}</p>
                                    <p><b>Cantidad Horas:</b> ${p.cantidadHoras ?? 0}</p>
                                    <p><b>Observaciones:</b> ${p.observaciones ?? "-"}</p>
                                    <p><b>Km Repaso:</b> ${p.kmRepaso ?? 0}</p>
                                    <p><b>Estado:</b> <span class="estado-parte">${p.estado ?? "PENDIENTE"}</span></p>
                                    <p><b>PDF:</b> ${p.pdf ? "Sí" : "No"}</p>
                                    <p class="col-span-full"><b>Detalle:</b> ${p.detalle ?? "-"}</p>
                                </div>
                            </td>
                        </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>

            <div class="flex justify-center items-center gap-4 mt-4">
                <button id="btn-prev" 
                    class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${page <= 1 ? "opacity-50 cursor-not-allowed" : ""}">
                    Anterior
                </button>

                <span class="text-white text-sm">Página ${result.currentPage} de ${result.totalPages}</span>

                <button id="btn-next" 
                    class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${page >= result.totalPages ? "opacity-50 cursor-not-allowed" : ""}">
                    Siguiente
                </button>
            </div>
        `;

        // === Eventos ===
        const filas = section.querySelectorAll(".fila-remito");
        filas.forEach(fila => {
            fila.addEventListener("click", (e) => {
                if (e.target.closest(".acciones")) return;
                const detalle = fila.nextElementSibling;
                detalle.classList.toggle("hidden");
            });
        });

        section.querySelectorAll(".btn-editar, .btn-eliminar").forEach(btn => {
            btn.addEventListener("click", e => e.stopPropagation());
        });

        // --- Paginación con filtros ---
        section.querySelector("#btn-prev")?.addEventListener("click", async () => {
            if (page > 1) {
                const nuevaTabla = await crearTabla(page - 1, limit, filtros);
                section.replaceWith(nuevaTabla);
                document.dispatchEvent(new CustomEvent("tablaPartesActualizada", { detail: nuevaTabla }));
            }
        });

        section.querySelector("#btn-next")?.addEventListener("click", async () => {
            if (page < result.totalPages) {
                const nuevaTabla = await crearTabla(page + 1, limit, filtros);
                section.replaceWith(nuevaTabla);
                document.dispatchEvent(new CustomEvent("tablaPartesActualizada", { detail: nuevaTabla }));
            }
        });

        // Reiniciar controladores
        initRemitoController();
        initUsuarioControllerUsuario();
        initClienteController();

    } catch (error) {
        section.innerHTML = `<p class="text-red-500 text-center">Error al cargar datos: ${error.message}</p>`;
    }

    return section;
}



export function crearTablaUsuarios() {
    const section = document.createElement("section");
    section.id = "tabla-usuarios";
    section.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";

    section.innerHTML = `
        <table class="w-full text-sm text-white border-collapse">
            <thead class="bg-slate-900/80 text-white uppercase text-xs tracking-wide">
                <tr>
                    <th class="px-4 py-3 text-center">ID</th>
                    <th class="px-4 py-3 text-center">Nombre</th>
                    <th class="px-4 py-3 text-center">Apellido</th>
                    <th class="px-4 py-3 text-center">Teléfono</th>
                    <th class="px-4 py-3 text-center">Correo</th>
                    <th class="px-4 py-3 text-center">Tipo</th>
                    <th class="px-4 py-3 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${[1, 2, 3, 4, 5].map(i => `
                <tr class="cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${i}">
                    <td class="px-4 py-2 text-center">${i}</td>
                    <td class="px-4 py-2 text-center">Nombre ${i}</td>
                    <td class="px-4 py-2 text-center">Apellido ${i}</td>
                    <td class="px-4 py-2 text-center">2994${i}000${i}</td>
                    <td class="px-4 py-2 text-center">usuario${i}@correo.com</td>
                    <td class="px-4 py-2 text-center">${i % 2 === 0 ? "admin" : "cliente"}</td>
                    <td class="px-4 py-2 flex justify-center gap-2">
                        <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar-usuario" title="Editar-usuario">
                            <i class='bx bx-pencil'></i>
                        </button>
                        <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar-usuario" title="Eliminar-usuario">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    return section;
}


export function crearTablaClientes() {
    const section = document.createElement("section");
    section.id = "tabla-clientes";
    section.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";

    section.innerHTML = `
        <table class="w-full text-sm text-white border-collapse">
            <thead class="bg-slate-900/80 text-white uppercase text-xs tracking-wide">
                <tr>
                    <th class="px-4 py-3 text-center">ID</th>
                    <th class="px-4 py-3 text-center">CUIT</th>
                    <th class="px-4 py-3 text-center">Razón Social</th>
                    <th class="px-4 py-3 text-center">Correo</th>
                    <th class="px-4 py-3 text-center">Dirección</th>
                    <th class="px-4 py-3 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${[1, 2, 3, 4, 5].map(i => `
                <tr class="cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${i}">
                    <td class="px-4 py-2 text-center">${i}</td>
                    <td class="px-4 py-2 text-center">20-1234567${i}-0</td>
                    <td class="px-4 py-2 text-center">Cliente ${i} SRL</td>
                    <td class="px-4 py-2 text-center">cliente${i}@empresa.com</td>
                    <td class="px-4 py-2 text-center">Calle Falsa ${i * 100}, Ciudad</td>
                    <td class="px-4 py-2 flex justify-center gap-2">
                        <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar-cliente" title="Editar-cliente">
                            <i class='bx bx-pencil'></i>
                        </button>
                        <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar-cliente" title="Eliminar-cliente">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    return section;
}
