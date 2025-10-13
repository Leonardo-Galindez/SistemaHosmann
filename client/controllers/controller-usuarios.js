import { crearFormUsuario } from "../components/forms.js"; // Asegúrate de que la ruta sea correcta

export function renderControllerUsuarios() {
    // Referencia al botón "Agregar usuario"
    const btnAgregar = document.getElementById("btn-agregar-usuario");
    if (!btnAgregar) {
        console.warn("No se encontró el botón #btn-agregar-usuario");
        return;
    }

    btnAgregar.addEventListener("click", () => {
        // Si ya hay un formulario abierto, no crear otro
        //if (document.getElementById("usuario-form")) return;

        const formUsuario = crearFormUsuario();
        document.body.appendChild(formUsuario);

        // === CONTROLADORES DE BOTONES ===

        // Cerrar (ícono X)
        const btnCerrar = formUsuario.querySelector("#cerrar-form-usuario");
        btnCerrar.addEventListener("click", () => {
            formUsuario.remove();
        });

        // Cancelar
        const btnCancelar = formUsuario.querySelector("button[type='reset']");
        btnCancelar.addEventListener("click", (e) => {
            e.preventDefault();
            formUsuario.remove();
        });

        // Guardar (submit)
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

            // Obtener todos los campos con name
            const formData = new FormData(formUsuario);

            try {
                const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/add_usuario.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    formUsuario.remove();
                    // Aquí podrías recargar la lista de usuarios si tuvieras una función para eso
                    // cargarUsuarios();
                } else {
                    alert(result.message);
                }

            } catch (error) {
                console.error("Error al guardar usuario:", error);
                alert("Error al conectar con el servidor.");
            }
        });
    });
}
