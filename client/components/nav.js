export async function crearNavbar() {
    const nav = document.createElement("nav");
    nav.className = [
        "fixed top-0 left-0 w-full z-50",
        "bg-transparent",
        "backdrop-blur-md backdrop-saturate-150",
        "border-b border-white/10"
    ].join(" ");

    nav.innerHTML = `
        <div class="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <a href="#" class="flex items-center gap-2">
                    <img src="../img/logo.png" alt="Hosmann Logo" class="h-8 w-8 rounded">
                    <span class="text-white font-bold text-xl">Hosmann</span>
                </a>

                <!-- Botón hamburguesa (solo móvil) -->
                <button id="menuToggle" class="lg:hidden text-white text-2xl focus:outline-none">
                    <i class="bx bx-menu"></i>
                </button>

                <!-- Links escritorio -->
                <div class="hidden lg:flex gap-3 items-center">
                    <a href="#partes" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                         <i class='bx bx-file'></i> Partes
                    </a>
                    <a id="linkClientes" href="#clientes" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                        <i class='bx bx-buildings'></i> Clientes
                    </a>
                    <a id="linkUsuarios" href="#usuarios" class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                         <i class='bx bx-user'></i> Usuarios
                    </a>
                    <a href="#dashboard" 
                        class="flex items-center gap-1 px-3 py-1 text-white text-sm border border-white/30 rounded-md hover:bg-white/10 transition">
                        <i class='bx bx-table'></i> Tablero
                    </a>
                    <!-- Botón salir -->
                    <a href="#" 
                    onclick="document.getElementById('logoutModal').classList.remove('hidden'); return false;"
                    class="flex items-center gap-1 px-3 py-1 text-red-400 text-sm border border-red-500/50 rounded-md hover:text-red-200 hover:bg-red-600/20 transition">
                        <i class='bx bx-log-out'></i> Salir
                    </a>
                </div>
            </div>
        </div>

        <!-- Menú móvil -->
        <div id="mobileMenu" class="hidden lg:hidden flex-col bg-gray-900/95 px-4 py-4 space-y-2">
            <a href="#partes" class="flex items-center gap-2 px-3 py-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition">
                <i class='bx bx-file'></i> Partes
            </a>
            <a id="mobileClientes" href="#clientes" class="flex items-center gap-2 px-3 py-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition">
                <i class='bx bx-buildings'></i> Clientes
            </a>
            <a id="mobileUsuarios" href="#usuarios" class="flex items-center gap-2 px-3 py-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition">
                <i class='bx bx-user'></i> Usuarios
            </a>
            <a href="#dashboard" class="flex items-center gap-2 px-3 py-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition">
                <i class='bx bx-table'></i> Tablero
            </a>
            <a href="#" onclick="document.getElementById('logoutModal').classList.remove('hidden'); return false;" class="flex items-center gap-2 px-3 py-2 text-red-400 border border-red-500/50 rounded-md hover:text-red-200 hover:bg-red-600/20 transition">
                <i class='bx bx-log-out'></i> Salir
            </a>
        </div>

        <!-- Modal -->
        <div id="logoutModal" class="hidden fixed inset-0 bg-black/50 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full 
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
    `;

    // Agregar el nav al DOM
    const navContainer = document.getElementById("nav");
    if (navContainer) {
        navContainer.appendChild(nav);
    } else {
        console.warn("No se encontró el contenedor #nav para insertar el navbar.");
        return;
    }

    // Script para toggle menú móvil
    setTimeout(() => {
        const toggle = nav.querySelector("#menuToggle");
        const menu = nav.querySelector("#mobileMenu");
        toggle?.addEventListener("click", () => menu.classList.toggle("hidden"));
    }, 0);

    // 🔹 Obtener tipo de usuario desde el backend
    try {
        const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_user.php", {
            method: "GET",
            credentials: "include" // Enviar cookies de sesión
        });
        const data = await response.json();

        if (data.success) {
            const tipoUsuario = data.usuario.tipo;
            console.log("Tipo de usuario:", tipoUsuario);

            if (tipoUsuario === "cliente") {
                const linkClientes = nav.querySelector("#linkClientes");
                const linkUsuarios = nav.querySelector("#linkUsuarios");
                const mobileClientes = nav.querySelector("#mobileClientes");
                const mobileUsuarios = nav.querySelector("#mobileUsuarios");

                linkClientes?.classList.add("hidden");
                linkUsuarios?.classList.add("hidden");
                mobileClientes?.classList.add("hidden");
                mobileUsuarios?.classList.add("hidden");
            }
        } else {
            console.warn("No hay usuario logueado, redirigiendo al login...");
            window.location.href = "../../login.html"; // o la ruta que uses para login
        }
    } catch (error) {
        console.error("Error al obtener tipo de usuario:", error);
    }
}
