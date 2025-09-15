export function crearFooter() {
    const section = document.createElement("section");
    section.id = "main-footer";
    section.className = "bg-slate-800/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow text-center";

    section.innerHTML = `
        <p class="text-gray-400 text-sm">
            © 2025 Hosmann. Todos los derechos reservados.
        </p>
    `;

    return section;
}
