<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

// --- Validar parámetro ID ---
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Falta el parámetro 'id'."
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$id = (int) $_GET['id'];

try {
    // --- Consulta del usuario ---
    $query = "
        SELECT 
            id,
            cuit,
            razonSocial,
            correo,
            direccion,
            DATE_FORMAT(fechaCreacion, '%Y-%m-%d %H:%i:%s') AS fechaCreacion,
            DATE_FORMAT(fechaEdicion, '%Y-%m-%d %H:%i:%s') AS fechaEdicion
        FROM cliente
        WHERE id = :id
        LIMIT 1
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    // --- Si se encontró el usuario ---
    if ($stmt->rowCount() > 0) {
        $cliente = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "success" => true,
            "cliente" => $cliente
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

    } else {
        echo json_encode([
            "success" => false,
            "message" => "Cliente no encontrado."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error en la base de datos: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
