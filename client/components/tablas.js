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
                        <th class="px-4 py-3 text-center">Lugar</th>
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


export function crearTablaDashboard() {
    const dashboardContainer = document.createElement("section");
    dashboardContainer.id = "tabla-dashboard";
    dashboardContainer.className = `
    hidden
    bg-slate-800/60 
    backdrop-blur-md 
    rounded-xl 
    p-6 
    border border-white/10 
    shadow-2xl 
    flex 
    flex-col 
    gap-6 
    w-full
  `;

    // 🟨 Contenedor de velocímetros (3 en PC / 1 en móvil)
    const filaVelocimetros = document.createElement("div");
    filaVelocimetros.id = "fila-velocimetros";
    filaVelocimetros.className = `
    grid 
    grid-cols-1 md:grid-cols-3 
    gap-6 
    w-full
  `;

    // 🟩 Contenedor de gráficos secundarios (2 en PC / 1 en móvil)
    const filaSecundaria = document.createElement("div");
    filaSecundaria.id = "fila-secundaria";
    filaSecundaria.className = `
    grid 
    grid-cols-1 md:grid-cols-2 
    gap-6 
    w-full
  `;

    // 🔹 Insertamos ambos al dashboard principal
    dashboardContainer.appendChild(filaVelocimetros);
    dashboardContainer.appendChild(filaSecundaria);

    // 🧩 Finalmente, lo insertamos al main
    const mainContainer = document.getElementById("main");
    if (mainContainer) {
        mainContainer.appendChild(dashboardContainer);
    } else {
        console.warn("No se encontró el contenedor #main para insertar el dashboard.");
    }
}

