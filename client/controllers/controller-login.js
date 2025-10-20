const form = document.getElementById('loginForm');
const alertBox = document.getElementById('alert');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');
const submitBtn = form.querySelector("button[type='submit']");

//  Mostrar / ocultar contraseña
togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    eyeOpen.classList.toggle('hidden', isPassword);  
    eyeClosed.classList.toggle('hidden', !isPassword);
});

//  Mostrar alerta (error o éxito)
function showAlert(message, type = "error") {
    alertBox.classList.remove("hidden");
    alertBox.textContent = message;
    alertBox.className =
        type === "error"
            ? "bg-red-500 text-white p-3 rounded-lg text-center mb-4 text-sm"
            : "bg-green-500 text-white p-3 rounded-lg text-center mb-4 text-sm";
}

//  Validar email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//  Evento de submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validaciones
    if (!email || !password) {
        showAlert("Por favor complete todos los campos.");
        return;
    }
    if (!isValidEmail(email)) {
        showAlert("Ingrese un correo electrónico válido.");
        return;
    }

    // Deshabilitar botón mientras se procesa
    submitBtn.disabled = true;
    submitBtn.textContent = "Ingresando...";

    try {
        // Aquí conectamos con PHP
        const response = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });

        const data = await response.json();

        if (data.success) {
            showAlert("Login exitoso. Redirigiendo...", "success");

            setTimeout(() => {
                window.location.href = "../SistemaHosmann/client/views/admin-home.php";
            }, 1500);
        } else {
            showAlert(data.message || "Credenciales incorrectas.");
        }
    } catch (error) {
        showAlert("Error de conexión con el servidor.");
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.textContent = "Ingresar";
    }
});
