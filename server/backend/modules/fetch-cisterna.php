<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    // --- Obtener usuario logueado ---
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));
    $filtros = [];

    // Si el usuario logueado es un cliente, aplicar filtro
    if ($usuario === 'cliente') {
        // ⚠️ Cambia 'PAE' por la variable que contenga el cliente real si está guardada en la sesión
        $filtros[] = "cliente = 'PAE'";
    }

    // --- Filtros base ---
    $filtros[] = "LOWER(tipoEquipo) LIKE '%cisterna%'";
    $filtros[] = "UPPER(lugarCisterna) IN ('CASE', 'LINDERO')";

    // --- Construir cláusula WHERE dinámicamente ---
    $where = 'WHERE ' . implode(' AND ', $filtros);

    // === Consulta: obtener el total acumulado de m3Batea y viajesCisterna para CISTERNA, agrupado por lugar ===
    $query = "
        SELECT 
            lugarCisterna AS lugar,
            SUM(m3Batea) AS total_m3Batea,
            SUM(viajesCisterna) AS total_viajesCisterna
        FROM parte
        $where
        GROUP BY lugarCisterna
        ORDER BY lugarCisterna ASC
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $lugares = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($lugares)) {
        echo json_encode([
            "success" => false,
            "message" => "No hay registros de cisterna en CASE o LINDERO."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Estructura final ===
    $resultado = [
        "success" => true,
        "tipoEquipo" => "Cisterna",
        "lugares" => []
    ];

    foreach ($lugares as $lugar) {
        $resultado["lugares"][] = [
            "lugar" => $lugar["lugar"],
            "totales" => [
                "m3Batea" => (float)$lugar["total_m3Batea"],
                "viajesCisterna" => (float)$lugar["total_viajesCisterna"]
            ]
        ];
    }

    echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener los totales: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>

