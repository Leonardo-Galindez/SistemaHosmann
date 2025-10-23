<?php
// Iniciar sesión
session_start();

// Verificar si el usuario está logueado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../../index.php");
    exit();
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hosmann</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../img/logo.png">
    <link rel="stylesheet" href="../css/home.css">
    <link rel="stylesheet" href="../css/nav.css">
    <link rel="stylesheet" href="../css/chart-barras.css">
    <link rel="stylesheet" href="../css/chart-torta.css">

    <!-- Tailwind -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Boxicons -->
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    <script src="https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js"></script>

    <!-- ApexCharts (la única que necesitás para los velocímetros) -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    <!-- Google Charts (si realmente lo usás en otros reportes, si no también podés quitarlo) -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

</head>

<body>

    <div id="nav"></div>
    <div id="panel"></div>
    <div id="main"></div>
    <div id="footer"></div>
    <script type="module" src="../controllers/render-admin.js"></script>
    <script type="module" src="../controllers/controller-tabla-partes.js"></script>
    <script type="module" src="../controllers/controller-filtros.js"></script>
    <script type="module" src="../controllers/controller-nav.js"></script>

</body>
<script>
document.addEventListener("DOMContentLoaded", () => {
  // Ejecutar el script del backend para procesar correos
  fetch("../../server/backend/modules/upload.php", { method: "GET" })
    .then(response => response.text())
    .then(data => console.log("Procesamiento de correos ejecutado:", data))
    .catch(err => console.error("Error al ejecutar upload.php:", err));
});
</script>


</html>