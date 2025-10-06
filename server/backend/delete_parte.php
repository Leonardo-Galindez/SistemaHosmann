<?php
require_once '../conection-bd.php';
header('Content-Type: application/json; charset=utf-8');

try {
    // Leer datos enviados (JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id'])) {
        echo json_encode(["error" => "Falta el parámetro 'id' del parte a eliminar."]);
        exit;
    }

    $id = $data['id'];

    // Consulta preparada
    $sql = "DELETE FROM parte WHERE nroParte = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Parte eliminado correctamente."]);
    } else {
        echo json_encode(["error" => "No se encontró el parte con ese número."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Error al eliminar: " . $e->getMessage()]);
}
