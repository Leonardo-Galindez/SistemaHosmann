<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    // === Filtros recibidos ===
    $fechaInicio = $_GET['fechaInicio'] ?? null;
    $fechaFin = $_GET['fechaFin'] ?? null;

    // === Usuario logueado ===
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));

    // === Filtros dinámicos ===
    $filtros = [];
    $params = [];

    // 🔹 Filtro por rango de fechas
    if ($fechaInicio) {
        $filtros[] = "fecha >= :fechaInicio";
        $params[':fechaInicio'] = $fechaInicio;
    }

    if ($fechaFin) {
        $filtros[] = "fecha <= :fechaFin";
        $params[':fechaFin'] = $fechaFin;
    }

    // 🔹 Filtro por cliente (si aplica)
    if ($usuario === 'cliente') {
        // ⚠️ Reemplazá 'PAE' por la variable real guardada en sesión si corresponde
        $filtros[] = "cliente = 'PAE'";
    }

    // --- Construir cláusula WHERE ---
    $where = !empty($filtros) ? 'WHERE ' . implode(' AND ', $filtros) : '';

    // === Consulta principal: consumo total de gasoil por categoría ===
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
            SUM(COALESCE(ltsgasoil, 0)) AS total_gasoil
        FROM parte
        $where
        GROUP BY categoria;
    ";

    $stmt = $pdo->prepare($query);

    // Vincular parámetros dinámicamente
    foreach ($params as $clave => $valor) {
        $stmt->bindValue($clave, $valor);
    }

    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // === Estructura base ===
    $data = [
        "Viales" => 0,
        "Pesados" => 0,
        "Livianos" => 0
    ];

    // === Calcular huella de carbono (kg CO₂) ===
    foreach ($resultados as $fila) {
        $categoria = $fila['categoria'];
        $totalLitros = (float) $fila['total_gasoil'];
        $huellaCO2 = $totalLitros * 2.5; // 💨 Conversión a kg CO₂

        if (isset($data[$categoria])) {
            $data[$categoria] += $huellaCO2;
        }
    }

    // === Devolver formato JSON ===
    echo json_encode([
        'success' => true,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al calcular la huella de carbono: ' . $e->getMessage()
    ]);
    exit;
}
?>
