<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="client/css/login.css">
    <link rel="icon" type="image/png" href="client/img/logo.png">
</head>

<body class="flex items-center justify-center min-h-screen text-slate-100">

    <div class="bg-[var(--surface)] shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <img src="client/img/logoHosmann.jpeg" alt="Logo" class="h-18 w-auto logo">
        </div>

        <!-- alerta -->
        <div id="alert" class="hidden bg-red-500 text-white p-3 rounded-lg text-center mb-4 text-sm"></div>

        <form id="loginForm" class="space-y-4">
            <!-- email -->
            <div class="relative">
                <input type="email" id="email" placeholder="Correo electrónico"
                    class="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 border-2 border-transparent focus:outline-none focus:border-[var(--card)]">
            </div>

            <!-- password -->
            <div class="relative">
                <input type="password" id="password" placeholder="Contraseña"
                    class="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 border-2 border-transparent focus:outline-none focus:border-[var(--card)]">
                <!-- Icono de ojo -->
                <button type="button" id="togglePassword" class="absolute right-3 top-3.5 text-slate-400">
                    <!-- Ojo abierto (visible por defecto) -->
                    <svg id="eyeOpen" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 
              4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <!-- Ojo tachado (oculto inicialmente) -->
                    <svg id="eyeClosed" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
              0-8.268-2.943-9.542-7a9.969 9.969 0 012.584-4.181m3.94-2.227A9.956 
              9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 
              0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                    </svg>
                </button>
            </div>

            <!-- boton -->
            <button type="submit"
                class="w-full py-3 bg-[var(--card)] hover:bg-orange-500 transition-colors font-semibold rounded-lg">
                Iniciar Sesión
            </button>
        </form>
    </div>

    <script src="client/controllers/controller-login.js"></script>
</body>

</html>