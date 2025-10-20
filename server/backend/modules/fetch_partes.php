<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = max(1, min(100, (int) ($_GET['limit'] ?? 10)));
$offset = ($page - 1) * $limit;

$cliente = isset($_GET['cliente']) ? trim($_GET['cliente']) : '';
$estado = isset($_GET['estado']) ? trim($_GET['estado']) : '';
$fechaInicio = isset($_GET['fechaInicio']) ? $_GET['fechaInicio'] : '';
$fechaFin = isset($_GET['fechaFin']) ? $_GET['fechaFin'] : '';

try {
    // --- Obtener usuario logueado ---
   $usuario = strtolower(trim( $_SESSION['usuario_tipo'] ?? 'desconocido'));

    // --- Construcción dinámica de filtros ---
    $filtros = [];
    $parametros = [];

    if (!empty($cliente)) {
        $filtros[] = "cliente LIKE :cliente";
        $parametros[':cliente'] = "%$cliente%";
    }

    // 🔒 Si es usuario de tipo administración, fuerza mostrar solo APROBADOS
    if ($usuario === 'administracion') {
        $filtros[] = "estado = 'APROBADO'";
    } elseif (!empty($estado)) {
        $filtros[] = "estado = :estado";
        $parametros[':estado'] = $estado;
    }

    if (!empty($fechaInicio) && !empty($fechaFin)) {
        $filtros[] = "fecha BETWEEN :fechaInicio AND :fechaFin";
        $parametros[':fechaInicio'] = $fechaInicio;
        $parametros[':fechaFin'] = $fechaFin;
    } elseif (!empty($fechaInicio)) {
        $filtros[] = "fecha >= :fechaInicio";
        $parametros[':fechaInicio'] = $fechaInicio;
    } elseif (!empty($fechaFin)) {
        $filtros[] = "fecha <= :fechaFin";
        $parametros[':fechaFin'] = $fechaFin;
    }

    $whereClause = count($filtros) > 0 ? 'WHERE ' . implode(' AND ', $filtros) : '';

    // --- Consulta principal ---
    $query = "
        SELECT 
            nroParte,
            idRespuesta,
            fecha,
            ejecutante,
            equipo,
            ltsgasoil,
            tipoEquipo,
            kmRecorridos,
            cantidadViajes,
            dia,
            lugar,
            descripcion,
            horaInicio,
            horaFin,
            cantidadHoras,
            observaciones,
            kmRepaso,
            lugarMotiniveladora,
            viajesCisterna,
            lugarCisterna,
            destinoBatea,
            viajesBatea,
            m3Batea,
            estado,
            pdf,
            cliente,
            tipoCarga,
            cantCarga,
            cantDescarga,
            cantera,
            DATE_FORMAT(fecha, '%d-%m-%Y') AS fecha_formateada,
            detalle
        FROM parte
        $whereClause
        ORDER BY fecha DESC
        LIMIT :limit OFFSET :offset
    ";

    $stmt = $pdo->prepare($query);
    foreach ($parametros as $key => $val) {
        $stmt->bindValue($key, $val);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $partes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --- Conteo total ---
    $countQuery = "SELECT COUNT(*) AS total FROM parte $whereClause";
    $countStmt = $pdo->prepare($countQuery);
    foreach ($parametros as $key => $val) {
        $countStmt->bindValue($key, $val);
    }
    $countStmt->execute();
    $totalCount = (int) $countStmt->fetchColumn();
    $totalPages = ($totalCount > 0) ? ceil($totalCount / $limit) : 1;

    echo json_encode([
        'success' => true,
        'data' => $partes,
        'totalCount' => $totalCount,
        'totalPages' => $totalPages,
        'currentPage' => $page,
        'user' => $usuario
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    error_log("Error en fetch_partes.php: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener los partes: ' . $e->getMessage()
    ]);
    exit;
}
?>
