<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    $anio = isset($_GET['anio']) ? (int) $_GET['anio'] : date('Y');

    $query = "
        SELECT 
            MONTH(fecha) AS mes_num,
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
        WHERE YEAR(fecha) = :anio
        GROUP BY mes_num, categoria
        ORDER BY mes_num;
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':anio', $anio, PDO::PARAM_INT);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $mesesNombres = [
        1 => "Enero", 2 => "Febrero", 3 => "Marzo", 4 => "Abril",
        5 => "Mayo", 6 => "Junio", 7 => "Julio", 8 => "Agosto",
        9 => "Septiembre", 10 => "Octubre", 11 => "Noviembre", 12 => "Diciembre"
    ];

    $data = [];
    foreach ($mesesNombres as $num => $nombre) {
        $data[$num] = ["mes" => $nombre, "Viales" => 0, "Pesados" => 0, "Livianos" => 0];
    }

    foreach ($resultados as $fila) {
        $mes = (int) $fila['mes_num'];
        $categoria = $fila['categoria'];
        $total = (float) $fila['total_gasoil'];

        if (isset($data[$mes][$categoria])) {
            $data[$mes][$categoria] += $total;
        }
    }

    echo json_encode(array_values($data), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener el consumo de gasoil: ' . $e->getMessage()
    ]);
    exit;
}
?>
