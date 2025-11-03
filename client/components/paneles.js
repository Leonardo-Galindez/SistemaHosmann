
export function crearPanelPartes() {
    const panelPartes = document.createElement("section");
    panelPartes.id = "panel-partes";
    panelPartes.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow";

    panelPartes.innerHTML = `
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <h1 class="text-xl font-semibold text-white">Gestión de Partes</h1>
            <div class="flex gap-2 flex-wrap">
                <button id="btn-filtros" class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    <i class='bx bx-filter text-base'></i> Filtros
                </button>
                <button id="btn-descargar" class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 transition">
                    <i class='bx bx-download text-base'></i> Reporte
                </button>
            </div>
        </div>
    `;

    
    const panelContainer = document.getElementById("panel");
    if (panelContainer) {
        panelContainer.appendChild(panelPartes);
    } else {
        console.warn("No se encontró el contenedor #panel para insertar el panel de partes.");
    }
}


export function crearPanelUsuarios() {
    const panelUsuarios = document.createElement("section");
    panelUsuarios.id = "panel-usuarios";
    panelUsuarios.className = "hidden bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow";

    panelUsuarios.innerHTML = `
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <h1 class="text-xl font-semibold text-white">Gestión de Usuarios</h1>
            <div class="flex gap-2 flex-wrap">
                <button id="btn-agregar-usuario" class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 transition">
                    <i class='bx bx-user-plus text-base'></i> Agregar
                </button>
                <button id="btn-filtros-usuarios" class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    <i class='bx bx-filter text-base'></i> Filtros
                </button>
            </div>
        </div>
    `;

    const panelContainer = document.getElementById("panel");
    if (panelContainer) {
        panelContainer.appendChild(panelUsuarios);
    } else {
        console.warn("No se encontró el contenedor #panel para insertar el panel de usuarios.");
    }
}



export function crearPanelClientes() {
    const panelClientes = document.createElement("section");
    panelClientes.id = "panel-clientes";
    panelClientes.className = "hidden bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow";

    panelClientes.innerHTML = `
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <h1 class="text-xl font-semibold text-white">Gestión de Clientes</h1>
            <div class="flex gap-2 flex-wrap">
                <button id="btn-filtros-clientes" class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    <i class='bx bx-filter text-base'></i> Filtros
                </button>
            </div>
        </div>
    `;

    const panelContainer = document.getElementById("panel");
    if (panelContainer) {
        panelContainer.appendChild(panelClientes);
    } else {
        console.warn(" No se encontró el contenedor #panel para insertar el panel de clientes.");
    }
}



export function crearPanelDashboard() {
    const panelDashboard = document.createElement("section");
    panelDashboard.id = "panel-dashboard";
    panelDashboard.className = "hidden bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow";

    panelDashboard.innerHTML = `
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <h1 class="text-xl font-semibold text-white">Dashboard Gerencial</h1>
            <div class="flex gap-2 flex-wrap">
                <button id="btn-filtros-tablero" class="flex items-center gap-1 px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    <i class='bx bx-filter text-base'></i> Filtros
                </button>
            </div>
        </div>
    `;

    const panelContainer = document.getElementById("panel");
    if (panelContainer) {
        panelContainer.appendChild(panelDashboard);
    } else {
        console.warn(" No se encontró el contenedor #panel para insertar el panel de clientes.");
    }
}
