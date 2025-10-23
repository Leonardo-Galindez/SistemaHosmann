<?php
require_once '../../conection-bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    $anio = isset($_GET['anio']) ? (int) $_GET['anio'] : date('Y');

    // --- Obtener usuario logueado ---
    $usuario = strtolower(trim($_SESSION['usuario_tipo'] ?? 'desconocido'));
    $filtros = ["YEAR(fecha) = :anio"];

    // Si el usuario logueado es cliente, aplicar filtro
    if ($usuario === 'cliente') {
        // ⚠️ Cambia 'PAE' por la variable real si el cliente se guarda en la sesión
        $filtros[] = "cliente = 'PAE'";
    }

    // --- Construir cláusula WHERE dinámica ---
    $where = 'WHERE ' . implode(' AND ', $filtros);

    // === Consulta principal: consumo de gasoil por mes y categoría ===
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
        $where
        GROUP BY mes_num, categoria
        ORDER BY mes_num;
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':anio', $anio, PDO::PARAM_INT);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // === Nombres de los meses ===
    $mesesNombres = [
        1 => "Enero", 2 => "Febrero", 3 => "Marzo", 4 => "Abril",
        5 => "Mayo", 6 => "Junio", 7 => "Julio", 8 => "Agosto",
        9 => "Septiembre", 10 => "Octubre", 11 => "Noviembre", 12 => "Diciembre"
    ];

    // === Inicializar estructura base ===
    $data = [];
    foreach ($mesesNombres as $num => $nombre) {
        $data[$num] = [
            "mes" => $nombre,
            "Viales" => 0,
            "Pesados" => 0,
            "Livianos" => 0
        ];
    }

    // === Calcular huella de carbono (kg CO₂) ===
    foreach ($resultados as $fila) {
        $mes = (int) $fila['mes_num'];
        $categoria = $fila['categoria'];
        $totalLitros = (float) $fila['total_gasoil'];
        $huellaCO2 = $totalLitros * 2.5; // 💨 Conversión a kg CO₂

        if (isset($data[$mes][$categoria])) {
            $data[$mes][$categoria] += $huellaCO2;
        }
    }

    echo json_encode(array_values($data), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al calcular la huella de carbono: ' . $e->getMessage()
    ]);
    exit;
}
?>

