<?php
require_once '../../conection-bd.php';
header('Content-Type: application/json; charset=utf-8');

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id']) || !isset($data['estado'])) {
        echo json_encode(["error" => "Datos incompletos."]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE parte SET estado = :estado WHERE nroParte = :id");
    $stmt->execute([
        ':estado' => $data['estado'],
        ':id' => $data['id']
    ]);

    echo json_encode(["success" => true, "message" => "Estado actualizado correctamente."]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
