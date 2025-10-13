<?php
require_once '../../conection-bd.php';
header('Content-Type: application/json; charset=utf-8');

try {
    // === Consulta: obtener el total acumulado de kmRecorridos y kmRepaso para MOTONIVELADORA, agrupado por lugar ===
    $query = "
        SELECT 
            lugarMotiniveladora AS lugar,
            SUM(kmRecorridos) AS total_kmRecorridos,
            SUM(kmRepaso) AS total_kmRepaso
        FROM parte
        WHERE LOWER(tipoEquipo) LIKE '%motoniveladora%'
          AND UPPER(lugarMotiniveladora) IN ('CASE', 'LINDERO')
        GROUP BY lugarMotiniveladora
        ORDER BY lugarMotiniveladora ASC
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $lugares = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($lugares)) {
        echo json_encode([
            "success" => false,
            "message" => "No hay registros de motoniveladora en CASE o LINDERO."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Estructura final ===
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
