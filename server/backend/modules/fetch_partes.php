<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

// Parámetros de paginación
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

// Filtros
$empresa = isset($_GET['empresa']) ? trim($_GET['empresa']) : '';
$estado = isset($_GET['estado']) ? trim($_GET['estado']) : ''; // NUEVO
$fechaInicio = isset($_GET['fecha_inicio']) ? $_GET['fecha_inicio'] : '';
$fechaFin = isset($_GET['fecha_fin']) ? $_GET['fecha_fin'] : '';

try {
    $usuario = $_SESSION['usuario']['tipo'];

    // Construcción dinámica de filtros
    $filtros = [];
    $parametros = [];

    if (!empty($empresa)) {
        $filtros[] = "cliente LIKE :empresa";
        $parametros[':empresa'] = "%$empresa%";
    }

    if (!empty($estado)) {
        $filtros[] = "estado = :estado";
        $parametros[':estado'] = $estado;
    }

    if (!empty($fechaInicio)) {
        $filtros[] = "fecha >= :fechaInicio";
        $parametros[':fechaInicio'] = $fechaInicio;
    }

    if (!empty($fechaFin)) {
        $filtros[] = "fecha <= :fechaFin";
        $parametros[':fechaFin'] = $fechaFin;
    }

    $whereClause = '';
    if (count($filtros) > 0) {
        $whereClause = 'WHERE ' . implode(' AND ', $filtros);
    }

    // Consulta principal
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

    // Conteo total
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
        'totalPages' => $totalPages,
        'currentPage' => $page,
        'user' => $usuario
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener los partes: ' . $e->getMessage()
    ]);
}
exit;
