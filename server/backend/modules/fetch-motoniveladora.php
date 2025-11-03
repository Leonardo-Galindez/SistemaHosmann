<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    // --- Obtener usuario logueado ---
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));
    $filtros = [];

    // --- Filtros base ---
    $filtros[] = "LOWER(tipoEquipo) LIKE '%motoniveladora%'";
    $filtros[] = "UPPER(lugarMotiniveladora) IN ('CASE', 'LINDERO')";

    // --- Filtro por usuario cliente ---
    if ($usuario === 'cliente') {
        // Cambia 'PAE' por la variable de sesión real si la tenés disponible
        $filtros[] = "cliente = 'PAE'";
    }

    // --- Filtros de fecha ---
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
            lugarMotiniveladora AS lugar,
            SUM(kmRecorridos) AS total_kmRecorridos,
            SUM(kmRepaso) AS total_kmRepaso
        FROM parte
        $where
        GROUP BY lugarMotiniveladora
        ORDER BY lugarMotiniveladora ASC
    ";

    $stmt = $pdo->prepare($query);

    // --- Enlazar parámetros de fecha si existen ---
    if (!empty($fechaInicio)) $stmt->bindValue(':fechaInicio', $fechaInicio);
    if (!empty($fechaFin)) $stmt->bindValue(':fechaFin', $fechaFin);

    $stmt->execute();
    $lugares = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($lugares)) {
        echo json_encode([
            "success" => false,
            "message" => "No hay registros de motoniveladora en CASE o LINDERO para las fechas indicadas."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // --- Estructura final ---
    $resultado = [
        "success" => true,
        "tipoEquipo" => "Motoniveladora",
        "lugares" => []
    ];

    foreach ($lugares as $lugar) {
        $resultado["lugares"][] = [
            "lugar" => $lugar["lugar"],
            "totales" => [
                "kmRecorridos" => (float)$lugar["total_kmRecorridos"],
                "kmRepaso" => (float)$lugar["total_kmRepaso"]
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
