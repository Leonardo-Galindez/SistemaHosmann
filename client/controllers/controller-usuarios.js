import { crearFormUsuario } from "../components/forms.js"; // Asegúrate de que la ruta sea correcta

function mostrarLoader(mensaje = "Procesando...") {
    if (document.getElementById("loader-overlay")) return; // evita duplicados

    const loader = document.createElement("div");
    loader.id = "loader-overlay";
    loader.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="flex flex-col items-center">
                <div class="loader-circle w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                <p class="text-white font-medium mt-3">${mensaje}</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}

function ocultarLoader() {
    const loader = document.getElementById("loader-overlay");
    if (loader) loader.remove();
}

function mostrarAviso(tipo = "info", mensaje = "") {
    const colores = {
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-600",
        info: "bg-blue-600"
    };

    const aviso = document.createElement("div");
    aviso.className = `fixed bottom-5 right-5 ${colores[tipo]} text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50`;
    aviso.textContent = mensaje;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 3000);
}


export function renderControllerUsuarios() {
    const btnAgregar = document.getElementById("btn-agregar-usuario");
    if (!btnAgregar) {
        console.warn("No se encontró el botón #btn-agregar-usuario");
        return;
    }

    btnAgregar.addEventListener("click", () => {
        const formUsuario = crearFormUsuario();
        document.body.appendChild(formUsuario);

        // === CONTROLADORES DE BOTONES ===
        const btnCerrar = formUsuario.querySelector("#cerrar-form-usuario");
        btnCerrar.addEventListener("click", () => formUsuario.remove());

        const btnCancelar = formUsuario.querySelector("button[type='reset']");
        btnCancelar.addEventListener("click", (e) => {
            e.preventDefault();
            formUsuario.remove();
        });

        // === Envío del formulario ===
        formUsuario.addEventListener("submit", async (e) => {
            e.preventDefault();

            const pass = formUsuario.querySelector("#password").value;
            const pass2 = formUsuario.querySelector("#password2").value;
            const error = formUsuario.querySelector("#password-error");

            if (pass !== pass2) {
                error.classList.remove("hidden");
                return;
            } else {
                error.classList.add("hidden");
            }

            const formData = new FormData(formUsuario);

            try {

                mostrarLoader("Creando usuario...");

                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/add_usuario.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                ocultarLoader();

                if (result.success) {
                    mostrarAviso("success", "✅ " + (result.message || "Usuario agregado correctamente."));
                    formUsuario.remove();
                    // Si existe una función para recargar la lista, podés llamarla acá
                    // fetchAndRenderUsuarios();
                } else {
                    mostrarAviso("error", "❌ " + (result.message || "Error al agregar usuario."));
                }

            } catch (error) {
                ocultarLoader();
                console.error("Error al guardar usuario:", error);
                mostrarAviso("warning", "⚠️ Error al conectar con el servidor.");
            }
        });
    });
}   


function abrirConfirmacionCerrar() {
    if (document.getElementById("confirmCloseModal")) return;

    const confirmModal = document.createElement("div");
    confirmModal.id = "confirmCloseModal";
    confirmModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]";

    confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cerrar formulario</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">¿Seguro que quieres cerrar el formulario? Se perderán los datos no guardados.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarCerrarForm" class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 transition">
                    Cancelar
                </button>
                <button id="confirmarCerrarForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector("#cancelarCerrarForm").addEventListener("click", () => {
        confirmModal.remove();
    });

    confirmModal.querySelector("#confirmarCerrarForm").addEventListener("click", () => {
        confirmModal.remove();
        cerrarFormulario();
    });
}
