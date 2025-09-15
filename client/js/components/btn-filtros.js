export function crearFiltros() {
    const section = document.createElement("section");
    section.id = "main-header";
    section.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow";

    section.innerHTML = `
        <div class="flex justify-between items-center">
            <h1 class="text-xl font-semibold text-white">Gestión de Partes</h1>
            <div class="flex gap-2">
                <!-- Botón Filtrar -->
                <button class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    <i class='bx bx-filter text-base'></i> Filtros
                </button>

                <!-- Botón Descargar Reporte -->
                <button class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 transition">
                    <i class='bx bx-download text-base'></i> Reporte
                </button>
            </div>
        </div>
    `;

    return section;
}
