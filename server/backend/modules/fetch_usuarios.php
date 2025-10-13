<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

// Parámetros de paginación
$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = max(1, min(100, (int) ($_GET['limit'] ?? 10)));
$offset = ($page - 1) * $limit;

// Filtros opcionales
$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';
$correo = isset($_GET['correo']) ? trim($_GET['correo']) : '';
$tipo = isset($_GET['tipo']) ? trim($_GET['tipo']) : '';

try {
    $usuarioSesion = $_SESSION['usuario']['tipo'] ?? 'desconocido';

    // --- Construcción dinámica de filtros ---
    $filtros = [];
    $parametros = [];

    if (!empty($nombre)) {
        $filtros[] = "(nombre LIKE :nombre OR apellido LIKE :nombre)";
        $parametros[':nombre'] = "%$nombre%";
    }

    if (!empty($correo)) {
        $filtros[] = "correo LIKE :correo";
        $parametros[':correo'] = "%$correo%";
    }

    if (!empty($tipo)) {
        $filtros[] = "tipo = :tipo";
        $parametros[':tipo'] = $tipo;
    }

    $whereClause = count($filtros) > 0 ? 'WHERE ' . implode(' AND ', $filtros) : '';

    // --- Consulta principal ---
    $query = "
        SELECT 
            id,
            nombre,
            apellido,
            telefono,
            correo,
            tipo,
            DATE_FORMAT(fechaCreacion, '%d-%m-%Y %H:%i:%s') AS fechaCreacion,
            DATE_FORMAT(fechaEdicion, '%d-%m-%Y %H:%i:%s') AS fechaEdicion
        FROM usuario
        $whereClause
        ORDER BY fechaCreacion DESC
        LIMIT :limit OFFSET :offset
    ";

    $stmt = $pdo->prepare($query);

    foreach ($parametros as $key => $val) {
        $stmt->bindValue($key, $val);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --- Conteo total para paginación ---
    $countQuery = "SELECT COUNT(*) AS total FROM usuario $whereClause";
    $countStmt = $pdo->prepare($countQuery);
    foreach ($parametros as $key => $val) {
        $countStmt->bindValue($key, $val);
    }
    $countStmt->execute();
    $totalCount = (int) $countStmt->fetchColumn();
    $totalPages = ($totalCount > 0) ? ceil($totalCount / $limit) : 1;

    // --- Respuesta JSON ---
    echo json_encode([
        'success' => true,
        'data' => $usuarios,
        'totalCount' => $totalCount,
        'totalPages' => $totalPages,
        'currentPage' => $page,
        'userSession' => $usuarioSesion
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener los usuarios: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
?>
