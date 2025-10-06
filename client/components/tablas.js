export function crearTablaPartes() {
    const tablaPartes = document.createElement("section");
    tablaPartes.id = "tabla-partes";
    tablaPartes.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";
    tablaPartes.innerHTML = `
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
                <tbody  id="tablaPartes">
                
                </tbody>
            </table>

            <div class="flex justify-center items-center gap-4 mt-4">
                <button id="btn-prev" 
                    class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
                    Anterior
                </button>

                <span class="text-white text-sm">Página </span>

                <button id="btn-next" 
                    class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
                    Siguiente
                </button>
            </div>

    `;

    const navContainer = document.getElementById("main");
    if (navContainer) {
        navContainer.appendChild(tablaPartes);
    } else {
        console.warn("No se encontró el contenedor #main para insertar la tabla.");
    }
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
            <tbody id="tablaUsuarios">

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
            <tbody id="tablaClientes">
            
            </tbody>
        </table>
    `;

    return section;
}
