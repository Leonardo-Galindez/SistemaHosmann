    <?php
    require_once '../../conection-bd.php';
    session_start();

    header('Content-Type: application/json; charset=utf-8');

    // Parámetros de paginación
    $page = max(1, (int) ($_GET['page'] ?? 1));
    $limit = max(1, min(100, (int) ($_GET['limit'] ?? 10)));
    $offset = ($page - 1) * $limit;

    // Filtros opcionales
    $nombre = isset($_GET['razonSocial']) ? trim($_GET['razonSocial']) : '';


    try {
        $usuario = strtolower(trim( $_SESSION['usuario_tipo'] ?? 'desconocido'));

        // --- Construcción dinámica de filtros ---
        $filtros = [];
        $parametros = [];

        if (!empty($nombre)) {
            $filtros[] = "(razonSocial LIKE :razonSocial)";
            $parametros[':razonSocial'] = "%$nombre%";
        }


        $whereClause = count($filtros) > 0 ? 'WHERE ' . implode(' AND ', $filtros) : '';

        // --- Consulta principal ---
        $query = "
            SELECT 
                id,
                cuit,
                razonSocial,
                correo,
                direccion,
                DATE_FORMAT(fechaCreacion, '%d-%m-%Y %H:%i:%s') AS fechaCreacion,
                DATE_FORMAT(fechaEdicion, '%d-%m-%Y %H:%i:%s') AS fechaEdicion
            FROM cliente
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

        $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // --- Conteo total para paginación ---
        $countQuery = "SELECT COUNT(*) AS total FROM cliente $whereClause";
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
            'data' => $clientes,
            'totalCount' => $totalCount,
            'totalPages' => $totalPages,
            'currentPage' => $page,
            'userSession' => $usuarioSesion
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener los clientes: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }
    ?>
