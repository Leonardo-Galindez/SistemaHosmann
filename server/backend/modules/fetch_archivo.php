<?php
require_once '../../conection-bd.php';
header('Content-Type: application/json; charset=utf-8');

$idRespuesta = $_GET['idRespuesta'] ?? '';

if (empty($idRespuesta)) {
    echo json_encode([
        "success" => false,
        "message" => "Falta el idRespuesta."
    ]);
    exit;
}

try {
    // 🔍 Buscar el nombre del PDF en la base de datos
    $stmt = $pdo->prepare("SELECT pdf FROM parte WHERE idRespuesta = :idRespuesta");
    $stmt->execute([':idRespuesta' => $idRespuesta]);
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$resultado) {
        echo json_encode([
            "success" => false,
            "message" => "No se encontró ningún registro con ese ID."
        ]);
        exit;
    }

    $pdf = trim($resultado['pdf']);

    if ($pdf === '') {
        echo json_encode([
            "success" => false,
            "message" => "El campo PDF está vacío en la base de datos."
        ]);
        exit;
    }

    // ✅ Ruta física del archivo (ajustada a /backend/modules/uploads/)
    $ruta = __DIR__ . "/uploads/" . $pdf;

    // --- DEBUG: mostrar la ruta real y contenido de la carpeta uploads ---
    if (!file_exists($ruta)) {
        echo json_encode([
            "success" => false,
            "message" => "El archivo PDF no existe en el servidor.",
            "ruta_real" => realpath($ruta) ?: "Ruta no resuelta",
            "carpeta_uploads" => scandir(__DIR__ . "/uploads/")
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ✅ URL pública del archivo
    $nombreArchivo = basename($pdf);
    $url = "https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/uploads/" . $nombreArchivo;

    // 🔰 Respuesta exitosa
    echo json_encode([
        "success" => true,
        "url" => $url,
        "nombreArchivo" => $nombreArchivo,
        "ruta_real" => realpath($ruta) // info útil para depuración
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener el PDF: " . $e->getMessage()
    ]);
}
?>
