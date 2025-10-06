export function crearFooter() {
    const footer = document.createElement("section");
    footer.id = "main-footer";
    footer.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow text-center";

    footer.innerHTML = `
        <p class="text-gray-400 text-sm">
            © 2025 Hosmann. Todos los derechos reservados.
        </p>
    `;

    const panelContainer = document.getElementById("footer");
    if (panelContainer) {
        panelContainer.appendChild(footer);
    } else {
        console.warn("No se encontró el contenedor #footer para insertar el footer.");
    }
}
