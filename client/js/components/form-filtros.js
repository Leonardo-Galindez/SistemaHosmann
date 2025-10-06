export function crearFormFiltros() {
    const section = document.createElement("section");
    section.id = "form-filtros";
    section.className = "fixed inset-0 flex items-center justify-center bg-black/60 z-50";

    section.innerHTML = `
        <div class="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-lg w-full flex flex-col overflow-hidden">
            
            <!-- Header -->
            <div class="flex justify-between items-center bg-slate-800/90 px-6 py-4 border-b border-slate-700">
                <h2 class="text-lg font-bold text-white flex items-center gap-2">
                    <i class='bx bx-filter-alt text-blue-400 text-xl'></i> Filtros
                </h2>
                <button id="cerrar-filtros" class="text-slate-400 hover:text-red-500 transition text-xl">
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <!-- Contenido -->
            <div class="p-6">
                <form class="grid grid-cols-1 gap-6 text-sm text-white">

                    <!-- Cliente -->
                    <div>
                        <label class="block mb-1 text-slate-300">Cliente</label>
                        <select id="filtro-cliente" class="input">
                            <option value="">Seleccione un cliente</option>
                            <option value="cliente1">Cliente 1</option>
                            <option value="cliente2">Cliente 2</option>
                            <option value="cliente3">Cliente 3</option>
                        </select>
                    </div>

                    <!-- Estado -->
                    <div>
                        <label class="block mb-1 text-slate-300">Estado</label>
                        <select id="filtro-estado" class="input">
                            <option value="">Seleccione un estado</option>
                            <option value="APROBADO">Aprobado</option>
                            <option value="DESAPROBADO">Desaprobado</option>
                            <option value="PENDIENTE">Pendiente</option>
                        </select>
                    </div>

                    <!-- Fechas -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block mb-1 text-slate-300">Fecha Inicio</label>
                            <input type="date" id="filtro-fecha-inicio" class="input">
                        </div>
                        <div>
                            <label class="block mb-1 text-slate-300">Fecha Fin</label>
                            <input type="date" id="filtro-fecha-fin" class="input">
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="flex justify-end gap-3 mt-4">
                        <button type="button" id="btn-aplicar" class="px-2 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-1 shadow-sm text-sm">
                            <i class='bx bx-check-circle text-base'></i> Aplicar
                        </button>
                        <button type="reset" id="btn-limpiar" class="px-2 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition flex items-center gap-1 shadow-sm text-sm">
                            <i class='bx bx-eraser text-base'></i> Limpiar
                        </button>
                        <button type="button" id="btn-cancelar" class="px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-1 shadow-sm text-sm">
                            <i class='bx bx-x-circle text-base'></i> Cancelar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    `;

    // Estilos de inputs
    const style = document.createElement("style");
    style.textContent = `
        .input {
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: rgb(30 41 59); /* slate-800 */
            border: 1px solid rgb(71 85 105); /* slate-600 */
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .input:focus {
            outline: none;
            border-color: rgb(59 130 246); /* blue-500 */
            box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
        }
    `;
    section.appendChild(style);

    return section;
}
