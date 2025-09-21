export function crearTabla() {
    const section = document.createElement("section");
    section.id = "main-table";
    section.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";

    section.innerHTML = `
        <table class="w-full text-sm text-white border-collapse">
            <thead class="bg-slate-900/80 text-white uppercase text-xs tracking-wide">
                <tr>
                    <th class="px-4 py-3 text-center">ID</th>
                    <th class="px-4 py-3 text-center">Nro</th>
                    <th class="px-4 py-3 text-center">Fecha</th>
                    <th class="px-4 py-3 text-center">Cliente</th>
                    <th class="px-4 py-3 text-center">Ejecutante</th>
                    <th class="px-4 py-3 text-center">Equipo</th>
                    <th class="px-4 py-3 text-center">Lts Gasoil</th>
                    <th class="px-4 py-3 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${[1, 2, 3, 4, 5,6,7,8,8,10].map(i => `
                <tr class="fila-remito cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${i}">
                    <td class="px-4 py-2 text-center">${i}</td>
                    <td class="px-4 py-2 text-center">R-100${i}</td>
                    <td class="px-4 py-2 text-center">2025-09-${15 - i}</td>
                    <td class="px-4 py-2 text-center">Cliente ${String.fromCharCode(64 + i)}</td>
                    <td class="px-4 py-2 text-center">Operador ${i}</td>
                    <td class="px-4 py-2 text-center">Equipo ${i}</td>
                    <td class="px-4 py-2 text-center">${300 + i * 50}</td>
                    <td class="px-4 py-2 flex justify-center gap-2 acciones">
                        <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar" title="Editar">
                            <i class='bx bx-pencil'></i>
                        </button>
                        <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar" title="Eliminar">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                </tr>
                <!-- Fila oculta con detalles -->
                <tr class="fila-detalle hidden bg-slate-700/40">
                    <td colspan="8" class="px-6 py-4 text-sm">
                        <div class="flex flex-col gap-2 text-slate-200">
                            <p><b>CUIT:</b> 20-1234567-${i}</p>
                            <p><b>Tipo Equipo:</b> Tipo ${i}</p>
                            <p><b>Km Recorridos:</b> ${i * 15}</p>
                            <p><b>Cantidad Viajes:</b> ${i * 2}</p>
                            <p><b>Día:</b> 2025-09-${15 - i}</p>
                            <p><b>Lugar:</b> Base ${i}</p>
                            <p><b>Descripción:</b> Trabajo ${i}</p>
                            <p><b>Hora Inicio:</b> 08:00</p>
                            <p><b>Hora Fin:</b> 17:00</p>
                            <p><b>Cantidad Horas:</b> 9</p>
                            <p><b>Observación:</b> Ninguna</p>
                            <p><b>Km Repaso:</b> ${i * 5}</p>
                            <p><b>Lugar Motoniveladora:</b> Zona ${i}</p>
                            <p><b>Viajes Cisterna:</b> ${i}</p>
                            <p><b>Lugar Cisterna:</b> Campo ${i}</p>
                            <p><b>Destino Batea:</b> Destino ${i}</p>
                            <p><b>Viajes Batea:</b> ${i}</p>
                            <p><b>M3 Batea:</b> ${i * 10}</p>
                            <p><b>Litros Gasoil:</b> ${300 + i * 50}</p>
                        </div>
                    </td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    // Controlador para expandir/colapsar solo si NO se hace click en acciones
    setTimeout(() => {
        const filas = section.querySelectorAll(".fila-remito");
        filas.forEach(fila => {
            fila.addEventListener("click", (e) => {
                // Si el click está dentro de la celda de acciones, no expandir
                if (e.target.closest(".acciones")) return;

                const detalle = fila.nextElementSibling;
                detalle.classList.toggle("hidden");
            });
        });

        // Controladores independientes para los botones
        section.querySelectorAll(".btn-editar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });

        section.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });
    }, 0);

    return section;
}
