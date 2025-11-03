<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    // --- Obtener usuario logueado ---
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));
    $filtros = [];

    // --- Filtro base por tipo de equipo ---
    $filtros[] = "LOWER(tipoEquipo) LIKE '%cisterna%'";
    $filtros[] = "UPPER(lugarCisterna) IN ('CASE', 'LINDERO')";

    // --- Filtro por usuario cliente (si aplica) ---
    if ($usuario === 'cliente') {
        // ⚠️ Cambia 'PAE' por la variable de sesión real si la tenés (por ejemplo $_SESSION['cliente'])
        $cliente = $_SESSION['cliente'] ?? 'PAE';
        $filtros[] = "cliente = :cliente";
    }

    // --- Filtros de fecha recibidos por GET ---
    $fechaInicio = $_GET['fechaInicio'] ?? '';
    $fechaFin = $_GET['fechaFin'] ?? '';

    if (!empty($fechaInicio) && !empty($fechaFin)) {
        $filtros[] = "fecha BETWEEN :fechaInicio AND :fechaFin";
    } elseif (!empty($fechaInicio)) {
        $filtros[] = "fecha >= :fechaInicio";
    } elseif (!empty($fechaFin)) {
        $filtros[] = "fecha <= :fechaFin";
    }

    // --- Construir cláusula WHERE ---
    $where = 'WHERE ' . implode(' AND ', $filtros);

    // --- Consulta SQL ---
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

    // --- Enlazar parámetros dinámicos ---
    if ($usuario === 'cliente') {
        $stmt->bindValue(':cliente', $cliente);
    }
    if (!empty($fechaInicio)) {
        $stmt->bindValue(':fechaInicio', $fechaInicio);
    }
    if (!empty($fechaFin)) {
        $stmt->bindValue(':fechaFin', $fechaFin);
    }

    $stmt->execute();
    $lugares = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --- Validar si hay resultados ---
    if (empty($lugares)) {
        echo json_encode([
            "success" => false,
            "message" => "No hay registros de cisterna en CASE o LINDERO para las fechas indicadas."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // --- Estructura de respuesta ---
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
