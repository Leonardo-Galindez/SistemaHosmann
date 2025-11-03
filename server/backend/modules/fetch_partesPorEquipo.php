<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    // --- Obtener usuario logueado ---
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));
    $filtros = [];

    // --- Filtros por cliente ---
    if ($usuario === 'cliente') {
        $filtros[] = "cliente = 'PAE'";
    }

    // --- Filtros por fecha ---
    $fechaInicio = $_POST['fechaInicio'] ?? $_GET['fechaInicio'] ?? '';
    $fechaFin = $_POST['fechaFin'] ?? $_GET['fechaFin'] ?? '';

    if (!empty($fechaInicio) && !empty($fechaFin)) {
        $filtros[] = "fecha BETWEEN :fechaInicio AND :fechaFin";
    } elseif (!empty($fechaInicio)) {
        $filtros[] = "fecha >= :fechaInicio";
    } elseif (!empty($fechaFin)) {
        $filtros[] = "fecha <= :fechaFin";
    }

    // --- Construcción del WHERE ---
    $where = '';
    if (!empty($filtros)) {
        $where = 'WHERE ' . implode(' AND ', $filtros);
    }

    // === Consulta principal ===
    $query = "
        SELECT 
            CASE
                WHEN LOWER(tipoEquipo) LIKE '%motoniveladora%' 
                    OR LOWER(tipoEquipo) LIKE '%retropala%'
                    OR LOWER(tipoEquipo) LIKE '%pala%'
                    OR LOWER(tipoEquipo) LIKE '%excavadora%'
                    OR LOWER(tipoEquipo) LIKE '%rodillo%' 
                    THEN 'Viales'
                WHEN LOWER(tipoEquipo) LIKE '%camión%'
                    OR LOWER(tipoEquipo) LIKE '%camion%'
                    OR LOWER(tipoEquipo) LIKE '%cisterna%'
                    OR LOWER(tipoEquipo) LIKE '%batea%'
                    OR LOWER(tipoEquipo) LIKE '%carreton%'
                    THEN 'Pesados'
                WHEN LOWER(tipoEquipo) LIKE '%camioneta%'
                    THEN 'Livianos'
                ELSE 'Otros'
            END AS categoria,
            COUNT(*) AS total_partes
        FROM parte
        $where
        GROUP BY categoria
        ORDER BY categoria ASC
    ";

    $stmt = $pdo->prepare($query);

    // Vincular parámetros de fecha si existen
    if (!empty($fechaInicio)) {
        $stmt->bindValue(':fechaInicio', $fechaInicio);
    }
    if (!empty($fechaFin)) {
        $stmt->bindValue(':fechaFin', $fechaFin);
    }

    $stmt->execute();
    $tipos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($tipos)) {
        echo json_encode([
            "success" => false,
            "message" => "No hay registros de partes cargados en el rango de fechas."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Estructura final ===
    $resultado = [
        "success" => true,
        "descripcion" => "Cantidad total de partes generados por tipo de equipo",
        "tipos" => [],
        "total_general" => 0
    ];

    foreach ($tipos as $t) {
        $categoria = $t["categoria"];
        $cantidad = (int)$t["total_partes"];

        $resultado["tipos"][] = [
            "categoria" => $categoria,
            "cantidad" => $cantidad
        ];

        $resultado["total_general"] += $cantidad;
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

