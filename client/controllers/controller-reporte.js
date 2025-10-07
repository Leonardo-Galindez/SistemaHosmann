import { partesActuales } from "./controller-tabla-partes.js";

export function renderControllerDescargar() {
    const botonDescargar = document.querySelector("#btn-descargar");

    if (botonDescargar) {
        botonDescargar.addEventListener("click", () => {
            exportarExcel(partesActuales);
        });
    }

}

function exportarExcel(partes) {
    // Creamos los datos para la hoja
    const data = partes.map(p => ({
        "Nro Parte": p.nroParte,
        "Fecha": p.fecha_formateada ?? p.fecha,
        "Lugar": p.lugar,
        "Ejecutante": p.ejecutante,
        "Equipo": p.equipo,
        "Km Recorridos": p.kmRecorridos ?? 0,
        "Tipo Equipo": p.tipoEquipo,
        "Lts Gasoil": p.ltsgasoil ?? 0,
        "Cantidad Viajes": p.cantidadViajes ?? 0,
        "Día": p.dia,
        "Cliente": p.cliente,
        "Descripción": p.descripcion,
        "Hora Inicio": p.horaInicio,
        "Hora Fin": p.horaFin,
        "Cantidad Horas": p.cantidadHoras ?? 0,
        "Observaciones": p.observaciones,
        "Km Repaso": p.kmRepaso ?? 0,
        "Estado": p.estado ?? "PENDIENTE",
        "PDF": p.pdf ? "Sí" : "No",
        "Detalle": p.detalle
    }));

    // Creamos el libro y la hoja
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Ajustar ancho automático de columnas
    const colWidths = Object.keys(data[0]).map(key => ({ wch: key.length + 10 }));
    ws['!cols'] = colWidths;

    // Agregamos la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Partes");

    // Generamos el archivo y lo descargamos
    XLSX.writeFile(wb, `partes_${new Date().toISOString().split("T")[0]}.xlsx`);
}
