<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    // --- Obtener usuario logueado ---
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));
    $filtros = [];

    if ($usuario === 'cliente') {
        // Cambia 'PAE' por el nombre real del cliente si se guarda en la sesión
        $filtros[] = "cliente = 'PAE'";
    }

    // --- Construir cláusula WHERE dinámicamente ---
    $where = '';
    if (!empty($filtros)) {
        $where = 'WHERE ' . implode(' AND ', $filtros);
    }

    // === Consulta principal: cantidad de partes por tipo de equipo ===
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
    $stmt->execute();
    $tipos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($tipos)) {
        echo json_encode([
            "success" => false,
            "message" => "No hay registros de partes cargados."
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
        $cantidad = (int) $t["total_partes"];

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
