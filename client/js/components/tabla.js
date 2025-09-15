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
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `
                <tr class="odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10">
                    <td class="px-4 py-2 text-center">${i}</td>
                    <td class="px-4 py-2 text-center">R-100${i}</td>
                    <td class="px-4 py-2 text-center">2025-09-${15 - i}</td>
                    <td class="px-4 py-2 text-center">Cliente ${String.fromCharCode(64 + i)}</td>
                    <td class="px-4 py-2 text-center">Operador ${i}</td>
                    <td class="px-4 py-2 text-center">Equipo ${i}</td>
                    <td class="px-4 py-2 text-center">${300 + i * 50}</td>
                    <td class="px-4 py-2 flex justify-center gap-2">
                        <!-- Botón Editar -->
                        <div class="relative group">
                            <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center" title="Editar">
                                <i class='bx bx-pencil'></i>
                            </button>
                        </div>
                        <!-- Botón Eliminar -->
                        <div class="relative group">
                            <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center" title="Eliminar">
                                <i class='bx bx-trash'></i>
                            </button>
                        </div>
                    </td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    return section;
}
