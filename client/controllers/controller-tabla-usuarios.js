let usuariosActuales = [];
let pageUsuarios = 1;
const limitUsuarios = 10;

export async function fetchAndRenderUsuarios(filtros = {}) {
    const { nombre = "", correo = "", tipo = "" } = filtros;
    const params = new URLSearchParams({ page: pageUsuarios, limit: limitUsuarios });

    if (nombre) params.append("nombre", nombre);
    if (correo) params.append("correo", correo);
    if (tipo) params.append("tipo", tipo);

    const section = document.getElementById("tabla-usuarios");
    const tbody = document.getElementById("tablaUsuarios");

    if (!section || !tbody) {
        console.error("No se encontró el contenedor de la tabla de usuarios.");
        return;
    }

    try {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-white py-4">Cargando usuarios...</td></tr>`;

        const response = await fetch(`https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_usuarios.php?${params.toString()}`);
        const result = await response.json();

        if (!result.success) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">${escapeHTML(result.message ?? "Error al cargar los usuarios.")}</td></tr>`;
            return;
        }

        const usuarios = result.data;
        usuariosActuales = usuarios;

        if (!usuarios || usuarios.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-white text-center py-4">No hay usuarios registrados.</td></tr>`;
            return;
        }

        // === Renderizar filas ===
        tbody.innerHTML = usuarios.map((u) => `
            <tr class="cursor-pointer odd:bg-slate-900/40 even:bg-slate-800/40 hover:bg-slate-700/40 transition border-b border-white/10" data-id="${escapeHTML(u.id)}">
                <td class="px-4 py-2 text-center">${escapeHTML(u.id)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.nombre)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.apellido)}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.telefono ?? "-")}</td>
                <td class="px-4 py-2 text-center">${escapeHTML(u.correo)}</td>
                <td class="px-4 py-2 text-center capitalize">${escapeHTML(u.tipo)}</td>
                <td class="px-4 py-2">
                    <div class="flex justify-center gap-2">
                        <button class="px-2 py-1 text-xs rounded bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center btn-editar" title="Editar">
                            <i class='bx bx-pencil'></i>
                        </button>
                        <button class="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center btn-eliminar" title="Eliminar">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");

        // === Paginación ===
        section.querySelector(".paginacion")?.remove();
        const paginacionHTML = `
            <div class="paginacion flex justify-center items-center gap-4 mt-4">
                <button id="btn-prev-user" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${pageUsuarios <= 1 ? "opacity-50 cursor-not-allowed" : ""}">
                    Anterior
                </button>
                <span class="text-white text-sm">Página ${result.currentPage} de ${result.totalPages}</span>
                <button id="btn-next-user" class="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 ${pageUsuarios >= result.totalPages ? "opacity-50 cursor-not-allowed" : ""}">
                    Siguiente
                </button>
            </div>
        `;
        section.insertAdjacentHTML("beforeend", paginacionHTML);

        // Controladores de paginación
        document.getElementById("btn-prev-user")?.addEventListener("click", () => {
            if (pageUsuarios > 1) {
                pageUsuarios--;
                fetchAndRenderUsuarios();
            }
        });

        document.getElementById("btn-next-user")?.addEventListener("click", () => {
            if (pageUsuarios < result.totalPages) {
                pageUsuarios++;
                fetchAndRenderUsuarios();
            }
        });

        // Agregar controladores para editar y eliminar
        renderControllerUsuarios();

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        tbody.innerHTML = `<tr><td colspan="7" class="text-red-500 text-center py-4">Error al conectar con el servidor.</td></tr>`;
    }
}


// === Controladores de acciones ===
export function renderControllerUsuarios() {
    const botonesEditar = document.querySelectorAll(".btn-editar");
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    // === Editar usuario ===
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (id) {
                console.log("Editar usuario ID:", id);
                abrirFormularioUsuario(id); // deberás implementarla
            }
        });
    });

    // === Eliminar usuario ===
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const id = btn.closest("tr").dataset.id;
            if (!id) return;

            if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

            try {
                const response = await fetch("backend/usuarios/delete_usuario.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });

                const result = await response.json();
                if (result.success) {
                    alert("Usuario eliminado correctamente.");
                    fetchAndRenderUsuarios();
                } else {
                    alert("Error al eliminar usuario: " + (result.message || ""));
                }
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Error de conexión con el servidor.");
            }
        });
    });
}


// === Función auxiliar para evitar XSS ===
function escapeHTML(str = "") {
    return str
        .toString()
        .replace(/[&<>'"]/g, (tag) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        }[tag]));
}
