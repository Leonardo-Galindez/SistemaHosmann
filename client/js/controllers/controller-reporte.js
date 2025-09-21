// Evento para descargar Excel
document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-descargar")) {
        const cliente = document.querySelector("#filtro-cliente")?.value || "";
        const fechaInicio = document.querySelector("#filtro-fecha-inicio")?.value || "";
        const fechaFin = document.querySelector("#filtro-fecha-fin")?.value || "";

        // Crear URL con filtros
        const url = `../../server/backend/exportar_excel.php?cliente=${encodeURIComponent(cliente)}&fechaInicio=${encodeURIComponent(fechaInicio)}&fechaFin=${encodeURIComponent(fechaFin)}`;

        // Forzar descarga
        window.open(url, "_blank");
    }
});
 