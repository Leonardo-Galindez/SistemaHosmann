<?php
require_once '../../conection-bd.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

try {
    // === Validar parámetro 'id' ===
    if (empty($_POST['id'])) {
        echo json_encode([
            "success" => false,
            "message" => "Falta el parámetro 'id' del usuario."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    $id = (int) $_POST['id'];

    // === Verificar si el usuario existe ===
    $check = $pdo->prepare("SELECT id FROM usuario WHERE id = :id");
    $check->execute([':id' => $id]);

    if ($check->rowCount() === 0) {
        echo json_encode([
            "success" => false,
            "message" => "El usuario no existe o ya fue eliminado."
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    // === Eliminar usuario ===
    $delete = $pdo->prepare("DELETE FROM usuario WHERE id = :id");
    $delete->bindParam(':id', $id, PDO::PARAM_INT);
    $delete->execute();

    echo json_encode([
        "success" => true,
        "message" => "Usuario eliminado correctamente."
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al eliminar el usuario: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
