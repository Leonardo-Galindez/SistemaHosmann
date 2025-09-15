export function crearNavbar() {
    const nav = document.createElement("nav");
    nav.className = [
        "fixed top-0 left-0 w-full z-50",
        "bg-transparent",              // fondo transparente
        "backdrop-blur-md backdrop-saturate-150",  // difuminado y saturación
        "border-b border-white/10",   // borde inferior sutil si lo necesitás
    ].join(" ");

    nav.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="#" class="flex items-center gap-2">
                    <img src="../assets/img/logo.png" alt="Hosmann Logo" class="h-8 w-8 rounded">
                    <span class="text-white font-bold text-xl">Hosmann</span>
                </a>
                <div class="flex gap-3 items-center">
                    <a href="#partes" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                         <i class='bx bx-file'></i> Partes
                    </a>
                    <a href="#clientes" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                        <i class='bx bx-buildings'></i> Clientes
                    </a>
                    <a href="#usuarios" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                         <i class='bx bx-user'></i> Usuarios
                    </a>
                    <a href="#tablero" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                         <i class='bx bx-table'></i> Tablero
                    </a>
                    <!-- Botón salir -->
                    <a href="#" 
                    onclick="document.getElementById('logoutModal').classList.remove('hidden'); return false;"
                    class="flex items-center gap-1 px-3 py-1 text-red-400 text-sm border border-red-500/50 rounded-md hover:text-red-200 hover:bg-red-600/20 transition">
                        <i class='bx bx-log-out'></i> Salir
                    </a>
                    <!-- Modal de confirmación -->
                    <div id="logoutModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
                        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cerrar sesión</h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres cerrar tu sesión?</p>
                        <div class="flex justify-end gap-3">
                        <button onclick="document.getElementById('logoutModal').classList.add('hidden');" 
                                class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                            Cancelar
                        </button>
                        <a href="../../server/backend/logout.php" 
                            class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                            Salir
                        </a>
                        </div>
                    </div>
                    </div>

                </div>

            </div>
        </div>
    `;

    return nav;
}
