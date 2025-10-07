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

    `;

    const navContainer = document.getElementById("main");
    if (navContainer) {
        navContainer.appendChild(tablaPartes);
    } else {
        console.warn("No se encontró el contenedor #main para insertar la tabla.");
    }
}

export function crearTablaUsuarios() {
    const tablaUsuarios = document.createElement("section");
    tablaUsuarios.id = "tabla-usuarios";
    tablaUsuarios.className = "hidden bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";

    tablaUsuarios.innerHTML = `
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

    const navContainer = document.getElementById("main");
    if (navContainer) {
        navContainer.appendChild(tablaUsuarios);
    } else {
        console.warn("No se encontró el contenedor #main para insertar la tabla.");
    }
}

export function crearTablaClientes() {
    const tablaClientes = document.createElement("section");
    tablaClientes.id = "tabla-clientes";
    tablaClientes.className = "hidden bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow overflow-x-auto";

    tablaClientes.innerHTML = `
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

    const navContainer = document.getElementById("main");
    if (navContainer) {
        navContainer.appendChild(tablaClientes);
    } else {
        console.warn("No se encontró el contenedor #main para insertar la tabla.");
    }
}
